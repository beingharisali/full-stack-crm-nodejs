const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const validate = require("../middleware/user");
router.post("/register", register);
router.post("/login", validate, login);
module.exports = router;
