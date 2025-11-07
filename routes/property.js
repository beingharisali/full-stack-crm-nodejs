const {
	getProperty,
	createProperty,
	deleteProperty,
	editProperty,
	getSingleProperty,
} = require("../controllers/property");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");
const { get } = require("mongoose");

router.post("/create-property", auth, adminOnly, createProperty);
router.get("/get-property", auth, getProperty);
router.patch("/edit-property/:id", auth, adminOnly, editProperty);
router.delete("/delete-property/:id", auth, adminOnly, deleteProperty);
router.get("get-single-property/:id", auth, adminOnly, getSingleProperty);

module.exports = router;
