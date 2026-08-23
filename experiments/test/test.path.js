import path from "node:path";
import fs from "node:fs";

console.log("📂 current path:", import.meta.dirname);
console.log("📂 current filename:", import.meta.filename);

const filePathname = "/items/item/index.js";
console.log("📂 baseName:", path.basename(filePathname));

console.log(
  "📂 baseName without extension:",
  path.basename(filePathname, ".js"),
);

console.log("📂 path only directory name:", path.dirname(filePathname));
console.log("📂 path only extension name:", path.extname(filePathname));
console.log("📂 path only join:", path.join("hello", "hi", "dir"));
console.log("📂 path only resolve:", path.resolve("pong", "pung"));
console.log("📂 path only parse:", path.parse(filePathname));

const newFilePath = path.join(import.meta.dirname, "data", "index.txt");
fs.appendFileSync(newFilePath, "\n test new text", "utf-8");

const data = fs.readFileSync(newFilePath, "utf-8");
console.log("📂 newFilePath only read:\n", data);
