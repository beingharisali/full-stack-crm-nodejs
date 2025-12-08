const {
	getProperty,
	createProperty,
	deleteProperty,
	editProperty,
	getSingleProperty,
	approveProperty,
	rejectProperty,
} = require("../controllers/property");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-property", auth, upload.array("images"), createProperty);
router.get("/get-property", getProperty);
router.patch("/edit-property/:id", editProperty);
router.delete("/delete-property/:id", deleteProperty);
router.get("/get-single-property/:id", getSingleProperty);
router.patch("/approve-property/:id", auth, approveProperty);
router.patch("/reject-property/:id", auth, rejectProperty);

module.exports = router;
