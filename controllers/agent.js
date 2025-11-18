const agentModel = require("../model/agent");

const createAgent = async (req, res) => {
	const { name, email, assignedProperty } = req.body;

	if (!name || !email) {
		return res.status(400).json({
			success: false,
			msg: "Name and email are required fields",
		});
	}

	try {
		const isAgent = await agentModel.findOne({ email });

		if (isAgent) {
			return res.status(409).json({
				success: false,
				msg: "Agent already exists!",
			});
		}

		const agent = await agentModel.create({
			name: name,
			email: email,
			assignedProperty: assignedProperty,
		});

		res.status(201).json({
			success: true,
			msg: "Agent created successfully",
			agent: agent,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Internal server error",
			error: process.env.NODE_ENV === "production" ? {} : error,
		});
	}
};

const getAgent = async (req, res) => {
	try {
		const agents = await agentModel.find({});
		res.status(200).json({
			success: true,
			msg: "Agents fetched successfully",
			agents: agents,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Internal server error",
			error: error,
		});
	}
};

const getSingleAgent = async (req, res) => {
	try {
		const agent = await agentModel.findById(req.params.id);

		if (!agent) {
			return res.status(404).json({
				success: false,
				msg: "Agent not found",
			});
		}

		res.status(200).json({
			success: true,
			msg: "Agent fetched successfully",
			agent: agent,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Internal server error",
			error: error,
		});
	}
};

const deleteAgent = async (req, res) => {
	try {
		const agent = await agentModel.findByIdAndDelete(req.params.id);

		if (!agent) {
			return res.status(404).json({
				success: false,
				msg: "Agent not found",
			});
		}

		res.status(200).json({
			success: true,
			msg: "Agent deleted successfully",
			agent: agent,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Internal server error",
			error: error,
		});
	}
};

const updateAgent = async (req, res) => {
	try {
		const { name, email, assignedProperty } = req.body;

		const agent = await agentModel.findByIdAndUpdate(
			req.params.id,
			{
				name,
				email,
				assignedProperty,
			},
			{
				new: true,
			}
		);

		if (!agent) {
			return res.status(404).json({
				success: false,
				msg: "Agent not found",
			});
		}

		res.status(200).json({
			success: true,
			msg: "Agent updated successfully",
			agent: agent,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Internal server error",
			error: error,
		});
	}
};

module.exports = {
	updateAgent,
	deleteAgent,
	getSingleAgent,
	getAgent,
	createAgent,
};
