import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";
import todoRoutes from "./routes/todo.js";
import ejs from "ejs";

const app = express();
const port = process.env.PORT || 5000;
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;

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

/*post
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.isfsk8s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
*/

/*  async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");
  } finally {
    // await client.close();
  }
}
*/
// run().catch(console.dir);

//get

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

app.use((req, res) => {
  res.status(404).sendFile(path.join(filePath, "public", "views", "404.html"));
});

app.listen(port, () => {
  console.log("listening " + port);
});
