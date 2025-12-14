const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const propertyModel = require("../model/property");
const authMiddleware = require("../middleware/auth");
const register = async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body;
	const isUserExist = await userModel.findOne({ email });
	if (isUserExist) {
		return res.status(400).json({
			success: "false",
			msg: "User already exist, please use another email",
		});
	}
	const token = jwt.sign({ userId: null, email, role }, process.env.JWT_SECRET);
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await userModel.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		role,
	});

	const tokenWithId = jwt.sign(
		{
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user._id,
			email: user.email,
			role: user.role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);

	let properties = [];
	try {
		properties = await propertyModel.find({}).lean();
	} catch (err) {
		console.error("Failed to fetch properties:", err);
	}
	res.status(201).json({
		success: "true",
		msg: "user registered successfully",
		user: {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
		},
		token: tokenWithId,
		properties,
	});
};
const login = async (req, res) => {
	const { email, password, role } = req.body;
	
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			msg: "Email and password are required!",
		});
	}
	
	const isUserExist = await userModel.findOne({ email });
	if (!isUserExist) {
		return res.status(404).json({
			success: "false",
			msg: "User not registered please create account first",
		});
	}
	
	const comparePassword = await bcrypt.compare(password, isUserExist.password);
	if (!comparePassword) {
		return res.status(404).json({
			success: false,
			msg: "Invalid credentials",
		});
	}
	
	if (role && role !== isUserExist.role) {
		return res.status(403).json({
			success: false,
			msg: `User is registered as ${isUserExist.role}, not as ${role}. Please select the correct role.`,
		});
	}
	
	const token = jwt.sign(
		{
			userId: isUserExist._id,
			email: isUserExist.email,
			role: isUserExist.role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '24h' }
	);

	let properties = [];
	try {
		properties = await propertyModel.find({}).lean();
	} catch (err) {
		console.error("Failed to fetch properties:", err);
	}

	res.status(200).json({
		success: "true",
		msg: "login successfully",
		token,
		user: {
			id: isUserExist._id,
			firstName: isUserExist.firstName,
			lastName: isUserExist.lastName,
			email: isUserExist.email,
			role: isUserExist.role,
		},
		properties,
	});
};

const getProfile = async (req, res) => {
	try {
		const user = await userModel.findById(req.user.userId).select('-password');
		if (!user) {
			return res.status(404).json({
				success: false,
				msg: "User not found"
			});
		}
		res.status(200).json({
			success: true,
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				role: user.role,
			}
		});
	} catch (error) {
		console.error("Error fetching profile:", error);
		res.status(500).json({
			success: false,
			msg: "Server error"
		});
	}
};

module.exports = { register, login, getProfile };
