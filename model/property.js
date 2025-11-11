const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
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
	imageURL: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
});
const propertyModel = mongoose.model("Propertie", propertySchema);
module.exports = propertyModel;
