const leadModel = require("../model/lead");

const createLead = async (req, res) => {
  const { name, email, message, propertyRef } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      msg: "Name and email are required fields",
    });
  }

  try {
    const islead = await leadModel.findOne({ email });

    if (islead) {
      return res.status(409).json({
        success: false,
        msg: "Lead already exists!",
      });
    }

    const lead = await leadModel.create({
      name: name,
      email: email,
      message: message,
      propertyRef: propertyRef,
    });

    res.status(201).json({
      success: true,
      msg: "Lead created successfully",
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: process.env.NODE_ENV === "production" ? {} : error,
      //   error: process.env.NODE_ENV === "production" ? {} : error, shazaib env file told me
    });
  }
};

const getLead = async (req, res) => {
  try {
    const lead = await leadModel.find({});
    res.status(200).json({
      success: true,
      msg: "lead fetched successfully",
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error,
    });
  }
};

const getSingleLead = async (req, res) => {
  try {
    const lead = await leadModel.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        msg: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Lead fetched successfully",
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error,
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await leadModel.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        msg: "lead not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "lead deleted successfully",
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { name, email, message, propertyRef } = req.body;

    const lead = await leadModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        message,
        propertyRef,
      },
      {
        new: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        msg: "lead not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "lead updated successfully",
      lead: lead,
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
  updateLead,
  deleteLead,
  getSingleLead,
  getLead,
  createLead,
};
