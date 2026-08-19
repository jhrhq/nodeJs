import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import queryString from "node:querystring";

const htmlFormPath = path.join(import.meta.dirname, "test.form.html");
const customSaveFormDataPath = "../data";
const savedFormDataPath = path.join(customSaveFormDataPath, "index.txt");

const server = createServer((req, res) => {
  fs.readFile(htmlFormPath, "utf-8", (err, data) => {
    if (err) {
      console.log("❌ form read failed", err);
      res.writeHead(404, { "content-type": "text/plain" });
      return res.end("404 not found");
    } else if (req.url === "/") {
      res.write(data);
    } else if (req.url === "/submit") {
      let user = [];
      req.on("data", (chunk) => {
        user.push(chunk);
      });
      req.on("end", () => {
        const parsedData = Buffer.concat(user).toString();
        const readableData = queryString.parse(parsedData);
        fs.appendFile(
          savedFormDataPath,
          JSON.stringify(readableData),
          "utf-8",
          (err) => {
            if (err) {
              console.log("❌ write failed", err);
            }
          },
        );
      });
      res.write(`<h1>✅ form submit successfull</h1>`);
    }
    res.end();
  });
});

server.listen(3000, () => console.log("🔊 listening on server", 3000));
