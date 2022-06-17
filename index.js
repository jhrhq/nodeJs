const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//user middleware
app.use(cors());
app.use(express.json());

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

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");

    // get users as api in the front end
    app.get("/user", async (req, res) => {
      const query = {};

      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // POST User : add a new user
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("adding newuser", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

//get
app.get("/", (req, res) => {
  res.send("running my crud server");
});

app.listen(port, () => {
  console.log("listening" + port);
});
