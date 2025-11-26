const Transaction = require("../model/transaction");
const mongoose = require("mongoose");

const createTransaction = async (req, res) => {
	try {
		const { propertyRef, client, agent, price, status } = req.body;

		if (!propertyRef || price === undefined || price === null) {
			return res.status(400).json({
				success: false,
				message: "propertyRef and price are required",
			});
		}

		// validate ObjectId format
		if (!mongoose.Types.ObjectId.isValid(propertyRef)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid propertyRef id" });
		}
		if (client && !mongoose.Types.ObjectId.isValid(client)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid client id" });
		}
		if (agent && !mongoose.Types.ObjectId.isValid(agent)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid agent id" });
		}

		const priceNum = Number(price);
		if (Number.isNaN(priceNum)) {
			return res.status(400).json({ success: false, message: "Invalid price" });
		}

		const newTransaction = await Transaction.create({
			propertyRef,
			client,
			agent,
			price: priceNum,
			status,
		});

		res.status(201).json({
			success: true,
			message: "Transaction created successfully",
			data: newTransaction,
		});
	} catch (error) {
		console.error("Create transaction error:", error);
		res.status(500).json({
			success: false,
			message: "Error creating transaction",
			error: error.message,
		});
	}
};

const updateTransaction = async (req, res) => {
	try {
		const transactionId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(transactionId)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid transaction id" });
		}

		const { propertyRef, client, agent, price } = req.body;

		if (propertyRef && !mongoose.Types.ObjectId.isValid(propertyRef)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid propertyRef id" });
		}
		if (client && !mongoose.Types.ObjectId.isValid(client)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid client id" });
		}
		if (agent && !mongoose.Types.ObjectId.isValid(agent)) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid agent id" });
		}
		if (price !== undefined && price !== null) {
			const priceNum = Number(price);
			if (Number.isNaN(priceNum)) {
				return res
					.status(400)
					.json({ success: false, message: "Invalid price" });
			}
			req.body.price = priceNum;
		}

		const updatedTransaction = await Transaction.findByIdAndUpdate(
			transactionId,
			req.body,
			{ new: true }
		);

		if (!updatedTransaction) {
			return res.status(404).json({
				success: false,
				message: "Transaction not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Transaction updated successfully",
			data: updatedTransaction,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error updating transaction",
			error: error.message,
		});
	}
};

const getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find({})
			.populate("propertyRef")
			.populate("agent")
			.populate("client");
		res.status(200).json({ success: true, data: transactions });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching transactions",
			error: error.message,
		});
	}
};

const getSingleTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id)
			.populate("propertyRef")
			.populate("agent")
			.populate("client");
		if (!transaction)
			return res
				.status(404)
				.json({ success: false, message: "Transaction not found" });
		res.status(200).json({ success: true, data: transaction });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error fetching transaction",
			error: error.message,
		});
	}
};

const deleteTransaction = async (req, res) => {
	try {
		const deleted = await Transaction.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res
				.status(404)
				.json({ success: false, message: "Transaction not found" });
		res
			.status(200)
			.json({ success: true, message: "Transaction deleted", data: deleted });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Error deleting transaction",
			error: error.message,
		});
	}
};

module.exports = {
	createTransaction,
	updateTransaction,
	getTransactions,
	getSingleTransaction,
	deleteTransaction,
};
