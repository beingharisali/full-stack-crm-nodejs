const { get } = require("mongoose");
const propertyModel = require("../model/property");

const createProperty = async (req, res) => {
	try {
		const create = await propertyModel.create(req.body);

		res.status(201).json({
			success: true,
			msg: "property created successfully",
			property: create,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: "Error occured in creating property",
			error: error.message,
		});
	}
};
const getProperty = async (req, res) => {
	try {
		const { city, type, maxPrice, minPrice } = req.query;
		const filter = {};
		if (city) {
			filter.city = { $regex: city, $options: i };
		}
		if (type) {
			filter.type = { $regex: type, $options: i };
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
		const validSortOrders = ["asc", "desc", "ascending", "descending", 1, -1];

		const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
		const order = validSortOrders.includes(sortOrder)
			? sortOrder === "desc" || sortOrder === "descending" || sortOrder === -1
				? -1
				: 1
			: -1;

		sort[sortField] = order;

		const getProperties = await propertyModel.find(filter).sort(sort);
		res.status(200).json({
			success: true,
			msg: "properties fetched successfully",
			property: getProperties,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			msg: "error occured in fetching data from databse",
			error: error,
		});
	}
};
const getSingleProperty = async (req, res) => {
	try {
		const getOneProperty = await propertyModel.findOne(req.params.id);
		res.status(200).json({
			success: true,
			msg: "fetched one product sucessfully",
			singleProperty: getOneProperty,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			msg: error.message,
			error: error,
		});
	}
};
const editProperty = async (req, res) => {
	try {
		const updateProperty = await propertyModel.findByIdAndUpdate(req.params.id);
		res.status(201).json({
			success: true,
			msg: "property updated successfully",
			property: updateProperty,
		});
	} catch (error) {
		res.status(400).json({
			success: true,
			msg: error.message,
			error: error,
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
		res(201).json({
			success: true,
			msg: "property deleted successfully",
			property: deleteProp,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.message,
			error: error,
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
console.log(object);
console.log(object);
