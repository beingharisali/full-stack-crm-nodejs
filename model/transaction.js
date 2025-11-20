const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    propertyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    agent: {
       type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["complete", "pending", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;
