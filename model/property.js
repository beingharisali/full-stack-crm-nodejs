const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Agent",
		},
		images: {
			type: [String],
			default: [],
		},
		imageURL: {
			type: String,
		},
	},
	{ timestamps: true }
);
const propertyModel = mongoose.model("Property", propertySchema);
module.exports = propertyModel;
