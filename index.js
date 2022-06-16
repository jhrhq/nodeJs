const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// user info and password
// username: monogodbuserDipok
// password: xzvTyBlzkpAmvMLr

const uri =
  "mongodb+srv://monogodbuserDipok:xzvTyBlzkpAmvMLr@cluster0.isfsk8s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/* client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("db connected");
  client.close();
}); */

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("foodExpress").collection("user");
    const user = { name: "mon", age: 20 };
    const result = await usersCollection.insertOne(user);
    console.log(`user inserted with id : ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
//user middleware
app.use(cors());
app.use(express.json());

//get
app.get("/", (req, res) => {
  res.send("running my crud server");
});

app.listen(port, () => {
  console.log("listening" + port);
});
