const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const crypto   = require('crypto');

const app  = express();
const PORT = process.env.PORT || 3000;

const CONFIG_PATH = path.join(__dirname, 'site-config.json');

// ── Middleware ────────────────────────────────────────────────────
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

// ── Root route → serve the HTML file ─────────────────────────────
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
