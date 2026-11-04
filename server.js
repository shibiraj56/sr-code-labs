// Standalone Node server for local testing and self-hosted environments
// Automatically loads .env.local or .env, routes /api/contact, and serves production build.

const http = require('http');
const fs = require('fs');
const path = require('path');
const contactHandler = require('./api/contact');

// Simple zero-dependency .env loader
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const envPath = path.join(__dirname, file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
          const eqIdx = line.indexOf('=');
          if (eqIdx !== -1) {
            const key = line.slice(0, eqIdx).trim();
            const val = line.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log(`[SR CODE LABS] Loaded environment variables from ${file}`);
      break;
    }
  }
}

loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 5000;
const BUILD_DIR = path.join(__dirname, 'build');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Handle contact API
  if (pathname === '/api/contact') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
      // 1MB safety limit
      if (bodyData.length > 1e6) {
        req.destroy();
      }
    });

    req.on('end', async () => {
      req.body = bodyData;
      await contactHandler(req, res);
    });
    return;
  }

  // Serve static files from build directory
  if (req.method === 'GET' || req.method === 'HEAD') {
    let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    if (safePath === '/' || safePath === '\\') safePath = '/index.html';
    let filePath = path.join(BUILD_DIR, safePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      return fs.createReadStream(filePath).pipe(res);
    }

    // Fallback for SPA routing
    const indexPath = path.join(BUILD_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return fs.createReadStream(indexPath).pipe(res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Build folder not found. Please run "npm run build" first.');
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`SR CODE LABS Server active at http://localhost:${PORT}`);
  console.log(`- Contact API Endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`- RESEND_API_KEY status: ${process.env.RESEND_API_KEY ? 'CONFIGURED' : 'NOT SET (see .env.example)'}`);
  console.log(`- Destination Inbox: ${process.env.CONTACT_TO_EMAIL || 'info@srcodelab.space'}`);
  console.log(`======================================================\n`);
});
