const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const crypto   = require('crypto');
const multer   = require('multer');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Multer – image uploads ────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = req.query.folder === 'partners'
      ? path.join(__dirname, 'public', 'images', 'partners')
      : path.join(__dirname, 'public', 'images');
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Keep original filename if provided, else use the field name + ext
    const custom = req.query.filename;
    const ext    = path.extname(file.originalname);
    cb(null, custom ? custom : file.originalname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase())
             && allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error('Only image files are allowed.'));
  }
});

const CONFIG_PATH = path.join(__dirname, 'site-config.json');
const BLOGS_PATH  = path.join(__dirname, 'blogs.json');

function readBlogs() {
  try { return JSON.parse(fs.readFileSync(BLOGS_PATH, 'utf-8')); } catch { return []; }
}
function writeBlogs(data) {
  fs.writeFileSync(BLOGS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Middleware ────────────────────────────────────────────────────

// ── CORS — allow requests from suratsales.in and local dev ───────
const ALLOWED_ORIGINS = [
  'https://suratsales.in',
  'https://www.suratsales.in',
  'https://sspl-production.pages.dev',
  'http://localhost:3000'
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

// ── Request logger ────────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms     = Date.now() - start;
    const status = res.statusCode;
    const color  = status >= 500 ? '\x1b[31m'
                 : status >= 400 ? '\x1b[33m'
                 : status >= 300 ? '\x1b[36m'
                 :                 '\x1b[32m';
    console.log(`${color}${status}\x1b[0m  ${req.method.padEnd(6)} ${req.path}  \x1b[90m${ms}ms\x1b[0m`);
  });
  next();
});

// ── Helper: read config ───────────────────────────────────────────
function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function writeConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf-8');
}

// ── Session store (in-memory, single-user) ────────────────────────
const sessions = new Set();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized — please log in as admin.' });
  }
  next();
}

// ── PUBLIC API ────────────────────────────────────────────────────

// GET /api/config — returns full site config (public, read-only)
app.get('/api/config', (req, res) => {
  const cfg = readConfig();
  // Strip sensitive fields before serving publicly
  const { adminPasswordHash, ...publicCfg } = cfg;
  res.json(publicCfg);
});

// ── ADMIN API ─────────────────────────────────────────────────────

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const cfg = readConfig();
  const { hash } = req.body;
  if (!hash) return res.status(400).json({ error: 'Missing hash' });

  const stored = cfg.adminPasswordHash || '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // default: "password"
  if (hash !== stored) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const token = generateToken();
  sessions.add(token);
  // Token expires after 8 hours
  setTimeout(() => sessions.delete(token), 8 * 60 * 60 * 1000);

  res.json({ token });
});

// GET /api/admin/verify — check if session is still valid
app.get('/api/admin/verify', requireAuth, (req, res) => {
  res.json({ ok: true });
});

// POST /api/admin/config — save site config
app.post('/api/admin/config', requireAuth, (req, res) => {
  const existing = readConfig();
  const incoming = req.body;

  // Protect the password hash — never overwrite from client payload unless explicitly set
  const newCfg = { ...incoming, adminPasswordHash: existing.adminPasswordHash };

  writeConfig(newCfg);
  console.log('\x1b[33m  ⚙ Config updated by admin\x1b[0m');
  res.json({ ok: true });
});

// POST /api/admin/password — change admin password
app.post('/api/admin/password', requireAuth, (req, res) => {
  const cfg = readConfig();
  const { currentHash, newHash } = req.body;
  const stored = cfg.adminPasswordHash || '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

  if (currentHash !== stored) {
    return res.status(403).json({ error: 'Current password is incorrect.' });
  }

  cfg.adminPasswordHash = newHash;
  writeConfig(cfg);
  console.log('\x1b[33m  🔑 Admin password changed\x1b[0m');
  res.json({ ok: true });
});

// POST /api/admin/upload — upload a single image (field name: "image")
app.post('/api/admin/upload', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file received.' });
    const folder = req.query.folder === 'partners' ? 'images/partners/' : 'images/';
    const url = '/' + folder + req.file.filename;
    console.log(`\x1b[33m  🖼  Image uploaded: ${req.file.filename}\x1b[0m`);
    res.json({ ok: true, url, filename: req.file.filename });
  });
});

// GET /api/admin/images — list all images in /public/images (and /partners sub-folder)
app.get('/api/admin/images', requireAuth, (req, res) => {
  const imgDir     = path.join(__dirname, 'public', 'images');
  const partnerDir = path.join(__dirname, 'public', 'images', 'partners');
  const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

  function listDir(dir, prefix) {
    try {
      return fs.readdirSync(dir)
        .filter(f => exts.includes(path.extname(f).toLowerCase()))
        .map(f => ({ filename: f, url: prefix + f, size: fs.statSync(path.join(dir, f)).size }));
    } catch { return []; }
  }

  res.json({
    main:     listDir(imgDir, '/images/'),
    partners: listDir(partnerDir, '/images/partners/')
  });
});

// DELETE /api/admin/images/:filename — delete an image
app.delete('/api/admin/images/:filename', requireAuth, (req, res) => {
  const folder = req.query.folder === 'partners' ? 'partners' : '';
  const filePath = folder
    ? path.join(__dirname, 'public', 'images', 'partners', req.params.filename)
    : path.join(__dirname, 'public', 'images', req.params.filename);

  // Safety: don't delete non-image or non-existing files
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found.' });
  fs.unlinkSync(filePath);
  console.log(`\x1b[31m  🗑  Image deleted: ${req.params.filename}\x1b[0m`);
  res.json({ ok: true });
});



// ── BLOG API ──────────────────────────────────────────────────────

// GET /api/blogs — public list (only published posts)
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs().filter(b => b.status === 'published');
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(blogs);
});

// GET /api/admin/blogs/all - admin list (all posts including drafts)
app.get('/api/admin/blogs/all', requireAuth, (req, res) => {
  const blogs = readBlogs();
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(blogs);
});

// POST /api/admin/blogs — create a new post
app.post('/api/admin/blogs', requireAuth, (req, res) => {
  const blogs = readBlogs();
  const post = { ...req.body, id: String(Date.now()) };
  blogs.push(post);
  writeBlogs(blogs);
  console.log(`\x1b[33m  ✍  Blog post created: ${post.title}\x1b[0m`);
  res.json({ ok: true, post });
});

// PUT /api/admin/blogs/:id — update existing post
app.put('/api/admin/blogs/:id', requireAuth, (req, res) => {
  const blogs = readBlogs();
  const idx = blogs.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Post not found.' });
  blogs[idx] = { ...blogs[idx], ...req.body, id: req.params.id };
  writeBlogs(blogs);
  console.log(`\x1b[33m  ✍  Blog post updated: ${blogs[idx].title}\x1b[0m`);
  res.json({ ok: true, post: blogs[idx] });
});

// DELETE /api/admin/blogs/:id — delete a post
app.delete('/api/admin/blogs/:id', requireAuth, (req, res) => {
  let blogs = readBlogs();
  const idx = blogs.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Post not found.' });
  const removed = blogs.splice(idx, 1)[0];
  writeBlogs(blogs);
  console.log(`\x1b[31m  🗑  Blog post deleted: ${removed.title}\x1b[0m`);
  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'surat-sales.html'));
});

// ── Static files from /public ─────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── 404 handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>404 – Not Found</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f0f; color: #fff;
               display: flex; flex-direction: column; align-items: center;
               justify-content: center; height: 100vh; margin: 0; gap: 16px; }
        h1   { font-size: 72px; font-weight: 800; color: #F5C518; margin: 0; }
        p    { color: #888; font-size: 16px; }
        a    { color: #F5C518; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>Page not found.</p>
      <a href="/">← Back to Surat Sales</a>
    </body>
    </html>
  `);
});

// ── 500 error handler ─────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('\x1b[31mServer error:\x1b[0m', err.stack);
  res.status(500).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>500 – Server Error</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f0f; color: #fff;
               display: flex; flex-direction: column; align-items: center;
               justify-content: center; height: 100vh; margin: 0; gap: 16px; }
        h1   { font-size: 72px; font-weight: 800; color: #ef4444; margin: 0; }
        p    { color: #888; font-size: 16px; }
        a    { color: #F5C518; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <h1>500</h1>
      <p>Something went wrong on the server.</p>
      <a href="/">← Back to Surat Sales</a>
    </body>
    </html>
  `);
});

// ── Start ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n\x1b[32m  ✓ Surat Sales is live!\x1b[0m');
  console.log(`\x1b[1m  → http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[33m  → Admin Panel: http://localhost:${PORT}/admin.html\x1b[0m`);
  console.log('\x1b[90m  Default password: password  (change immediately!)\x1b[0m\n');
});
