const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Request logger ───────────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms     = Date.now() - start;
    const status = res.statusCode;
    const color  = status >= 500 ? '\x1b[31m'   // red
                 : status >= 400 ? '\x1b[33m'   // yellow
                 : status >= 300 ? '\x1b[36m'   // cyan
                 :                 '\x1b[32m';  // green
    console.log(`${color}${status}\x1b[0m  ${req.method.padEnd(6)} ${req.path}  \x1b[90m${ms}ms\x1b[0m`);
  });
  next();
});

// ── Root route → serve the HTML file ────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'surat-sales.html'));
});

// ── Static files from /public ────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── 404 handler ──────────────────────────────────────────────────
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

// ── 500 error handler ────────────────────────────────────────────
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

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n\x1b[32m  ✓ Surat Sales is live!\x1b[0m');
  console.log(`\x1b[1m  → http://localhost:${PORT}\x1b[0m\n`);
});
