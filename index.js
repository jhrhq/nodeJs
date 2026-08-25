import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import session from 'express-session';
import { MongoClient } from 'mongodb';
import path from 'path';
import { errorHandler } from './middleware/error.middleware.js';
import notesRoutes from './routes/notes.js';
import todoRoutes from './routes/todo.js';
import todosRoutes from './routes/todos.routes.js';
// import dotenv from "dotenv";
import userRoutes from './routes/users.js';

// dotenv.config();
// constants
const port = process.env.PORT || 5000;
const uri = `mongodb://localhost:27017`;
const DATABASE_NAME = 'myDB';
// const ObjectId = require("mongodb").ObjectId;
const app = express();
const client = new MongoClient(uri);

//user middleware
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public', { etag: true }));
app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: 10_000 * 60 * 60, // 1 hour
    },
    resave: false,
    saveUninitialized: true,
    secret: 'mysecret123',
  }),
);

function adminCheckMiddleware(req, res, next) {
  if (req.query.age < 18) {
    res.end('<h1>Not Allowed!</h1>');
  } else {
    next();
  }
}

// route level middleware
app.use('/admin', (req, res, next) => {
  console.log('admin section accessed!');
  next();
});

//TODO app only json
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log("Connected directly to local MongoDB server.");
//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection("test");
//     const data = await collection.find({}).toArray();
//     console.log("database: ", data);
//   } catch (err) {}
// }

const filePath = path.resolve();

app.get('/', (req, res) => {
  todosRoutes;
  res.sendFile(path.join(filePath, 'public', 'views', 'index.html'));
});

app.get('/admin', adminCheckMiddleware, (req, res) => {
  res.sendFile(path.join(filePath, 'public', 'views', 'admin.html'));
});

app.use('/user', userRoutes);
app.use('/notes', notesRoutes);
app.use('/todo', todoRoutes);
app.use('/todos', todosRoutes);
app.use('/db', async (req, res) => {
  await connectToMongoDB();
  res.end('db route');
});

// using session
app.get('/login', (req, res) => {
  req.session.user = 'jhr';
  res.send('Session created for user jhr');
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send('Session created for user mohit');
  } else {
    res.send('Please login to access the dashboard');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('err in loggint out');
    }
    res.send('you have successfully logged out');
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(filePath, 'public', 'views', '404.html'));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log('listening ' + port);
});
