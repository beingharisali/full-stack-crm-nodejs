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
		ref: "property",
		default: [],
	},
});

const agentModel = mongoose.model("agent", agentSchema);
module.exports = agentModel;
