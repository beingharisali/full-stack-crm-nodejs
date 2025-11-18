const {
  updateLead,
  deleteLead,
  getSingleLead,
  getLead,
  createLead,
} = require("../controllers/lead");
const express = require("express");
const router = express.Router();

router.post("/create-lead", createLead);
router.get("/get-leads", getLead);
router.get("/get-lead/:id", getSingleLead);
router.delete("/delete-lead/:id", deleteLead);
router.patch("/update-lead/:id", updateLead);

module.exports = router;
