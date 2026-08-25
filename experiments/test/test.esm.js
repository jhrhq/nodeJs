import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';

console.log('OS platform', os.platform());

//Async
fs.readFile('README.md', 'utf-8', (err, data) =>
  err ? console.log('Error reading:', err) : console.log('file content', data),
);

//sync
const data = fs.readFileSync('README.md', 'utf-8');
console.log('sync file data', data);

// write file
// asyncsetHeader
/*fs.writeFile(
  "test.tsx",
  "testing, testing , disting, disting",
  "utf-8",
  (err) => console.log("writeFileError", err),
); */

// Append file

/*
fs.appendFile("test.tsx", "\n new testing, new disting", "utf-8", (err) =>
  err ? console.log("appendFileError", err) : console.log("✅ Success"),
);
*/

// file rename
/* fs.rename("test.tsx", "test.txt", (err) =>
  err
    ? console.log("rename Error", err)
    : console.log("✅ Rename Successfull "),
); */

// delete file
fs.unlink('test.txt', (err) => {
  if (err) console.log('test.txt file deletion error', err);
  console.log('✅ path/file.txt was deleted');
});

const server = createServer((req, res) => {
  const baseUrl = `http://${req.headers.host}`;
  const parseUrl = new URL(req.url, baseUrl);
  const pathname = parseUrl.pathname;

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h1>Hello, mom!</h1>');
  }
});

server.listen(3000, () => 'server is listening on port' + '80');
