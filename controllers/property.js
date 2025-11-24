const { get } = require("mongoose");
const propertyModel = require("../model/property");
const agentModel = require("../model/agent");
const cloudinary = require("../utils/cloudinary");

const createProperty = async (req, res) => {
	const files = req.files || [];
	const body = req.body || {};

	if (req.user && req.user.userId) {
		body.createdBy = req.user.userId;
	}

	const streamUpload = (fileBuffer) => {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: "crm/documents",
					resource_type: "auto",
				},
				(error, result) => {
					if (result) resolve(result);
					else reject(error);
				}
			);
			stream.end(fileBuffer);
		});
	};

	let fileUrls = [];
	if (files.length) {
		try {
			fileUrls = await Promise.all(
				files.map((file) => streamUpload(file.buffer))
			);
		} catch (uploadErr) {
			console.error("Cloudinary upload failed:", uploadErr);
			fileUrls = [];
		}
	}

	const uploadedUrls = fileUrls.map((f) => f?.secure_url).filter(Boolean);

	if (uploadedUrls.length) {
		body.images = uploadedUrls;
	}

	// use first image as backward-compatible single image URL
	if (uploadedUrls.length && !body.imageURL) {
		body.imageURL = uploadedUrls[0];
	}

	// cast numeric fields
	if (body.price) {
		const parsed = Number(body.price);
		if (!Number.isNaN(parsed)) body.price = parsed;
	}

	if (body.agentId) {
		body.assignedTo = body.agentId;
	}

	// basic validation
	if (!body.title || !body.price || !body.city || !body.desc) {
		return res
			.status(400)
			.json({ success: false, msg: "Missing required property fields" });
	}

	try {
		const create = await propertyModel.create(body);

		if (create.assignedTo) {
			await agentModel.findByIdAndUpdate(create.assignedTo, {
				$addToSet: { assignedProperties: create._id },
			});
		}

		res.status(201).json({
			success: true,
			msg: "Property created successfully",
			property: create,
		});
	} catch (error) {
		console.error("Failed to create property:", error);
		res.status(500).json({
			success: false,
			msg: "Error occurred in creating property",
			error:
				process.env.NODE_ENV === "production"
					? error.message
					: { message: error.message, stack: error.stack },
		});
	}
};

const getProperty = async (req, res) => {
	try {
		const { city, type, maxPrice, minPrice, sortBy, sortOrder } = req.query;

		const filter = {};

		if (city) {
			filter.city = { $regex: city, $options: "i" };
		}
		if (type) {
			filter.type = { $regex: type, $options: "i" };
		}

		if (maxPrice || minPrice) {
			filter.price = {};
			if (minPrice) {
				filter.price.$gte = parseInt(minPrice);
			}
			if (maxPrice) {
				filter.price.$lte = parseInt(maxPrice);
			}
		}

		const sort = {};
		const validSortFields = ["price", "createdAt", "updatedAt", "title"];
		const validSortOrders = [
			"asc",
			"desc",
			"ascending",
			"descending",
			"1",
			"-1",
		];

		const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

		const order = validSortOrders.includes(sortOrder)
			? sortOrder === "desc" || sortOrder === "descending" || sortOrder === "-1"
				? -1
				: 1
			: -1;

		sort[sortField] = order;

		const getProperties = await propertyModel.find(filter).sort(sort);

		res.status(200).json({
			success: true,
			msg: "Properties fetched successfully",
			properties: getProperties,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: "Error occurred in fetching data from database",
			error: error.message,
		});
	}
};

const getSingleProperty = async (req, res) => {
	try {
		const getOneProperty = await propertyModel.findById(req.params.id);

		if (!getOneProperty) {
			return res.status(404).json({
				success: false,
				msg: `Property with ID ${req.params.id} not found.`,
			});
		}

		res.status(200).json({
			success: true,
			msg: "Fetched one property successfully",
			property: getOneProperty,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message,
			error: error.message,
		});
	}
};

const editProperty = async (req, res) => {
	try {
		const updateProperty = await propertyModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!updateProperty) {
			return res.status(404).json({
				success: false,
				msg: `Property with ID ${req.params.id} not found for update.`,
			});
		}

		res.status(200).json({
			success: true,
			msg: "Property updated successfully",
			property: updateProperty,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message,
			error: error.message,
		});
	}
};

const deleteProperty = async (req, res) => {
	try {
		const deleteProp = await propertyModel.findByIdAndDelete(req.params.id);

		if (!deleteProp) {
			return res.status(404).json({
				success: false,
				msg: `Property with ID ${req.params.id} not found for deletion.`,
			});
		}

		res.status(200).json({
			success: true,
			msg: "Property deleted successfully",
			property: deleteProp,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message,
			error: error.message,
		});
	}
};

module.exports = {
	getProperty,
	createProperty,
	deleteProperty,
	editProperty,
	getSingleProperty,
};
