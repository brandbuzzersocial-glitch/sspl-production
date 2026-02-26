# Surat Sales — Local Dev Server

A lightweight Express server to run the **Surat Sales Private Limited** website locally.

---

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher**
- npm (comes bundled with Node.js)

Check your version:
```bash
node -v   # should print v18.x.x or higher
npm -v
```

---

## Project Structure

```
surat-sales/
├── server.js           ← Express server
├── package.json        ← Dependencies & scripts
├── README.md           ← You are here
└── public/
    └── surat-sales.html   ← The website
```

---

## Quick Start

**1. Install dependencies**
```bash
npm install
```

**2. Start the server**
```bash
npm start
```

**3. Open in your browser**
```
http://localhost:3000
```

You should see the Surat Sales website load with the 3D yarn spool intro animation.

---

## Development Mode (auto-reload)

Use `nodemon` to automatically restart the server whenever you edit `server.js`:

```bash
npm run dev
```

> The browser does **not** auto-refresh in dev mode — reload the tab manually after making HTML/CSS changes.

---

## Configuration

| Variable | Default | Description               |
|----------|---------|---------------------------|
| `PORT`   | `3000`  | Port the server listens on |

To run on a different port:
```bash
PORT=8080 npm start
```

---

## Console Output

The server logs every request with color-coded status codes:

```
  ✓ Surat Sales is live!
  → http://localhost:3000

200    GET    /             12ms
200    GET    /surat-sales.html   8ms
404    GET    /favicon.ico   3ms
```

---

## Troubleshooting

**Port already in use?**
```bash
# Kill whatever is on port 3000
npx kill-port 3000
# Then restart
npm start
```

**Node version too old?**  
Download the latest LTS from [nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm install 20
nvm use 20
```

**Three.js not loading?**  
The site loads Three.js from the Cloudflare CDN. Make sure you have an active internet connection — no local bundling is required.
