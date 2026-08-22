import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});

router.use("/", (req, res) => {
  res.end("<h1>Users only route</h1>");
});

export default router;
