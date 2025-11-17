const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  propertyRef: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Property",
    required: true,
  },
});
const leadModel = mongoose.model("Leads", leadSchema);
module.exports = leadModel;
