const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		propertyRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Property",
		},

		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},

		agent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Agent",
		},

		price: {
			type: Number,
			required: true,
		},

		status: {
			type: String,
			enum: ["complete", "pending", "cancel"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;
