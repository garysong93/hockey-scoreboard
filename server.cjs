const http = require('http');
const fs = require('fs');
const path = require('path');

// Railway networking is configured to forward to port 3000
const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  // Remove query string
  const cleanUrl = req.url.split('?')[0];

  let filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

  const ext = path.extname(filePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try clean URLs: /tutorial -> /tutorial/index.html (for pre-rendered pages)
      const cleanUrlPath = path.join(DIST_DIR, cleanUrl, 'index.html');
      if (fs.existsSync(cleanUrlPath)) {
        filePath = cleanUrlPath;
      } else {
        // SPA fallback - serve index.html for any non-file request
        filePath = path.join(DIST_DIR, 'index.html');
      }
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }

      const finalExt = path.extname(filePath);
      const contentType = mimeTypes[finalExt] || 'application/octet-stream';

      // Cache headers for static assets
      const headers = { 'Content-Type': contentType };
      if (finalExt && finalExt !== '.html') {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
      }
      headers['X-Content-Type-Options'] = 'nosniff';

      res.writeHead(200, headers);
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
