const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const fs = require("fs");
const loginRoute = (req, res, next) => {
  fs.appendFile("logs.txt", `${Date.now()}:${req.method}:${req.path}`);
  next();
};
router.post("/register", register, loginRoute);
router.post("/login", login, loginRoute);
module.exports = router;
