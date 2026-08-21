import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;

//user middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/*
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
console.log("filepath ", filePath);

app.get("/", (req, res) => {
  res.sendFile(filePath + "/public/views/index.html");
});

app.listen(port, () => {
  filePath;
  console.log("listening " + port);
});
