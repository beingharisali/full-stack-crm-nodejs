const {
	getProperty,
	createProperty,
	deleteProperty,
	editProperty,
	getSingleProperty,
} = require("../controllers/property");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

// expect field name `images` containing multiple files
router.post("/create-property", upload.array("images"), createProperty);
router.get("/get-property", getProperty);
router.patch("/edit-property/:id", editProperty);
router.delete("/delete-property/:id", deleteProperty);
router.get("/get-single-property/:id", getSingleProperty);

module.exports = router;
