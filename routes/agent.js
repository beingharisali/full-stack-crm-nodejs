const {
  updateAgent,
  deleteAgent,
  getSingleAgent,
  getAgent,
  createAgent,
  deactivateAgent,
  activateAgent,
} = require("../controllers/agent");
const express = require("express");
const router = express.Router();

router.post("/create-agent", createAgent);
router.get("/get-agents", getAgent);
router.get("/get-agent/:id", getSingleAgent);
router.delete("/delete-agent/:id", deleteAgent);
router.patch("/update-agent/:id", updateAgent);
router.patch("/deactivate-agent/:id", deactivateAgent);
router.patch("/activate-agent/:id", activateAgent);

module.exports = router;
