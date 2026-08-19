import { writeFile } from "node:fs/promises";
import fs from "node:fs";
import util from "node:util";
import path from "node:path";

const filepath = path.join(import.meta.dirname, "data", "index.txt");

writeFile(filepath, "\n new text added \n")
  .then((res) => console.log("✅ Write Successfull "))
  .catch((err) => console.log("❌ write failed", err));

const appendFilePromise = util.promisify(fs.appendFile);

appendFilePromise(filepath, "\n promisified appendFile")
  .then((res) => console.log("✅ Promisified append Successfull "))
  .catch((err) => console.log("❌ append failed", err));

// using async await
async function appendText() {
  try {
    await appendFilePromise(filepath, "\n ✅ Appended using async and await");
  } catch (err) {
    console.log("❌ append failed", err);
  }
}
appendText();
