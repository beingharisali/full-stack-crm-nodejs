const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const createLeads = async (req, res) => {
  try {
    const files = req.files;  
    const body = req.body;
    // ✅ helper for buffer upload (since you're on memoryStorage)
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "leads/documents",
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

    // ✅ upload all files to Cloudinary
    const fileUrls = files?.length
      ? await Promise.all(files.map((file) => streamUpload(file.buffer)))
      : [];

    const uploadedUrls = fileUrls.map((f) => f.secure_url);

    // ✅ build leadData according to schema
    const leadData = {
      Type: {
        Leadtype: body?.Leadtype,
        Agent: body?.Agent,
      },
      KeyboardEvent: body?.KeyboardEvent,
      Documents: uploadedUrls,
      Details: {
        Name: body?.Name,
        ProjectType: body?.ProjectType,
        Phone: body?.Phone,
        SecondaryPhone: body?.SecondaryPhone,
        Email: body?.Email,
        Nationality: body?.Nationality,
        SpokenLanguages: body?.SpokenLanguages
          ? Array.isArray(body.SpokenLanguages)
            ? body.SpokenLanguages
            : body.SpokenLanguages.split(",")
          : [],
        Gender: body?.Gender,
        PreferredRooms: body?.PreferredRooms,
        Budget: {
          From: body?.BudgetFrom,
          To: body?.BudgetTo,
        },
        PreferredPropertyType: body?.PreferredPropertyType,
        PreferredDevelopers: body?.PreferredDevelopers
          ? Array.isArray(body.PreferredDevelopers)
            ? body.PreferredDevelopers
            : body.PreferredDevelopers.split(",")
          : [],
        PaymentMethod: body?.PaymentMethod,
        SourceOfLead: body?.SourceOfLead,
        BirthDate: body?.BirthDate,
        BuyerType: body?.BuyerType,
        Furnishing: body?.Furnishing,
        PreferredSize: body?.PreferredSize,
      },
    };
    // ✅ save in DB
    const lead = await Leads.create(leadData);

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const register = async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body;
	const isUserExist = await userModel.findOne({ email });
	if (isUserExist) {
		return res.status(400).json({
			success: "false",
			msg: "User already exist, please use another email",
		});
	}
	const token = jwt.sign(
		{ firstName, lastName, email, password, role },
		process.env.JWT_SECRET
	);
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await userModel.create({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		role,
	});

	// include property data (all properties for now)
	let properties = [];
	try {
		properties = await propertyModel.find({}).lean();
	} catch (err) {
		// ignore property lookup failures but log
		console.error("Failed to fetch properties:", err);
	}
	res.status(201).json({
		success: "true",
		msg: "user regustered successfully",
		user,
		token,
		properties,
	});
};
const login = async (req, res) => {
	const { email, password } = req.body;
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
	const token = jwt.sign({ email, password }, process.env.JWT_SECRET);

	// include property data
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
			firstName: isUserExist.firstName,
			lastName: isUserExist.lastName,
			email: isUserExist.email,
			password: isUserExist.password,
			role: isUserExist.role,
		},
		properties,
	});
};
module.exports = { register, login };
