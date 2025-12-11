const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	assignedProperties: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Property",
		default: [],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

console.log("testing");

const agentModel = mongoose.model("Agent", agentSchema);
module.exports = agentModel;
