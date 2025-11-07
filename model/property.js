const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	price: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
	},
});
const propertyModel = mongoose.model("Propertie", propertySchema);
module.exports = propertyModel;
console.log(object);
