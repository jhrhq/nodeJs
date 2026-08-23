import express from "express";
import { userHomePage } from "../controller/user.controller.js";
const router = express.Router();

router.use((req, res, next) => {
  console.log(
    "%s %s %s ",
    "coming from home route ",
    req.method,
    req.url,
    req.path,
  );
  next();
});

router.use("/", userHomePage);

export default router;
