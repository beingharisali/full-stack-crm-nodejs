const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const fs = require("fs");
router.use("/register", register, (req, res, next) => {
  fs.appendFile("logs.txt", `${Date.now()}:${req.method}:${req.path}`);
  next();
});
router.use("/login", login, (req, res, next) => {
  fs.appendFile("logs.txt", `${Date.now()}:${req.method}:${req.path}`);
  next();
});
// router.post("/register", register);
// router.post("/login", login);
module.exports = router;
