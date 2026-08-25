import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(`<h1>Bang!</h1>`);
});

server.listen(3000, () => console.log('✅ listening on server', 3000));
