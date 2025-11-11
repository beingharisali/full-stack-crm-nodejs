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

router.post("/create-property", createProperty);
router.get("/get-property", getProperty);
router.patch("/edit-property/:id", editProperty);
router.delete("/delete-property/:id", deleteProperty);
router.get("get-single-property/:id", getSingleProperty);

module.exports = router;
