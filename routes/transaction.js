const express = require("express");
const router = express.Router();

const {
	createTransaction,
	updateTransaction,
	getTransactions,
	getSingleTransaction,
	deleteTransaction,
} = require("../controllers/transaction");

router.post("/create-transaction", createTransaction);
router.patch("/update-transaction/:id", updateTransaction);
router.get("/get-transactions", getTransactions);
router.get("/get-transaction/:id", getSingleTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;
