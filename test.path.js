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

const newfilePath = path.join(import.meta.dirname, "data", "index.txt");

fs.writeFileSync(newfilePath, "📂 test new file path", "utf-8", (err) => {
  if (err) {
    console.log("❌ write file error:", err);
  }
  console.log("✅ write file success");
});

const data = fs.readFileSync(newfilePath, "utf-8");

console.log("📂 Read file sync", data);
