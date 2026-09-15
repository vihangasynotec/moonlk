const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  // CORS & No-Cache Headers for reliable developer previews
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqUrl = req.url.split('?')[0];

  // Strip leading /moonlk if accessed via subpath
  if (reqUrl.startsWith('/moonlk/')) {
    reqUrl = reqUrl.replace('/moonlk/', '/');
  } else if (reqUrl === '/moonlk') {
    reqUrl = '/index.html';
  }

  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  // Remove leading slashes for safe join with __dirname
  const cleanPath = reqUrl.replace(/^\/+/, '');
  const filePath = path.join(__dirname, cleanPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If file not found and doesn't have an extension, try index.html fallback
        if (!ext) {
          const fallbackIndex = path.join(__dirname, 'index.html');
          fs.readFile(fallbackIndex, (fbErr, fbContent) => {
            if (!fbErr) {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(fbContent);
              return;
            }
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`404 Not Found: ${req.url}`);
          });
          return;
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${req.url}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(` MoonLK Luxury Atelier Server is Active!`);
  console.log(` Local:   http://localhost:${PORT}`);
  console.log(` Network: http://127.0.0.1:${PORT}`);
  console.log(` Subpath: http://localhost:${PORT}/moonlk/`);
  console.log(`====================================================`);
});
