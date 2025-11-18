const {
  updateAgent,
  deleteAgent,
  getSingleAgent,
  getAgent,
  createAgent,
} = require("../controllers/agent");
const express = require("express");
const router = express.Router();

router.post("/create-agent", createAgent);
router.get("/get-agents", getAgent);
router.get("/get-agent/:id", getSingleAgent);
router.delete("/delete-agent/:id", deleteAgent);
router.patch("/update-agent/:id", updateAgent);

module.exports = router;
