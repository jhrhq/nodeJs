import { createServer } from "node:http";

const PORT = 5000;

const server = createServer((req, res) => {
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);
  const pathname = parsedUrl.pathname;

  //Route: GET
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (req.method === "GET" && pathname === "/api/✅ users") {
    const user = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    (res.writeHead(200, { "content-type": "application/json" }),
      res.end(JSON.stringify(user)));
  } else if (req.method === "GET" && pathname === "/great") {
    const name = parsedUrl.searchParams.get("name") || "Guest";
    const title = parsedUrl.searchParams.get("title") || "Visitor";
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`<h1>Hello, ${name} the ${title}!</h1>`);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}...`);
});
