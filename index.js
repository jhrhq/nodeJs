const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

const users = [
  {
    id: "1",
    guid: "b942f5a5-906d-435c-8219-40158394a433",
    age: 37,
    name: "Myra Colon",
  },
  {
    id: "2",
    guid: "47b25b10-29a5-4ff7-858f-8aa8ec962c8b",
    age: 25,
    name: "Payne Bowers",
  },
  {
    id: "3",
    guid: "31f4b34f-28f3-4df0-b8c7-803f8f4077f7",
    age: 20,
    name: "Sykes Mejia",
  },
  {
    id: "4",
    guid: "6b725c09-b2c9-4fea-b71f-412d2323c2d9",
    age: 32,
    name: "Mckinney Estes",
  },
  {
    id: "5",
    guid: "282f28be-c228-442d-923d-d8718400c2e1",
    age: 39,
    name: "Leanna Mendoza",
  },
  {
    id: "6",
    guid: "bbca093e-457e-4121-8a0e-f4bfc99326ce",
    age: 40,
    name: "Gonzales Love",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.send(users);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  res.send(user);
});

// req getting from font end

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("post method succeded");
});

app.get("/about", (req, res) => {
  res.send("you just get inot the about me page");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
