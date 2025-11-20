const express = require("express");
const router = express.Router();

const {
  createTransaction,
  updateTransaction,
} = require("../controllers/transaction");

router.post("/create-transaction", createTransaction);
router.patch("/update-transaction/:id", updateTransaction);

module.exports = router;
