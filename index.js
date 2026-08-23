import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";
import todoRoutes from "./routes/todo.js";
import ejs from "ejs";
import { MongoClient } from "mongodb";

// constants
const port = process.env.PORT || 5000;
const uri = `mongodb://localhost:27017`;
const DATABASE_NAME = "myDB";
// const ObjectId = require("mongodb").ObjectId;
const app = express();
const client = new MongoClient(uri);

//user middleware
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public", { etag: true }));

function adminCheckMiddleware(req, res, next) {
  if (req.query.age < 18) {
    res.end("<h1>Not Allowed!</h1>");
  } else {
    next();
  }
}

// route level middleware
app.use("/admin", (req, res, next) => {
  console.log("admin section accessed!");
  next();
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected directly to local MongoDB server.");
    const db = client.db(DATABASE_NAME);
    const collection = db.collection("test");
    const data = await collection.find({}).toArray();
    console.log("database: ", data);
  } catch (err) {}
}

const filePath = path.resolve();

app.get("/", (req, res) => {
  res.sendFile(path.join(filePath, "public", "views", "index.html"));
});

app.get("/admin", adminCheckMiddleware, (req, res) => {
  res.sendFile(path.join(filePath, "public", "views", "admin.html"));
});

app.use("/user", userRoutes);
app.use("/notes", notesRoutes);
app.use("/todo", todoRoutes);
app.use("/db", async (req, res) => {
  await connectToMongoDB();
  res.end("db route");
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(filePath, "public", "views", "404.html"));
});

app.listen(port, () => {
  console.log("listening " + port);
});
