import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

let urls = {};
const PORT = 3002;

const URL_PATH = 'urls.json';

const filePath = path.join(import.meta.dirname, URL_PATH);

function saveUrls() {
  fs.writeFileSync(filePath, JSON.stringify(urls));
}
function getUrls() {
  const data = fs.readFileSync(filePath, 'utf-8');
  urls = JSON.parse(data);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/short') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { originalUrl } = JSON.parse(body);
        if (!originalUrl) {
          res.writeHead(400, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ error: 'Original URL is required' }));
        }
        const shortId = crypto.randomUUID().slice(0, 6);
        urls[shortId] = originalUrl;
        saveUrls();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ shorUrl: `http://localhost:${PORT}/${shortId}` }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else if (req.method === 'GET') {
    const shortId = req.url.slice(1); // remove leading /
    getUrls();
    if (urls[shortId]) {
      res.writeHead(302, { Location: urls[shortId] });
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'URL not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}...`);
});
