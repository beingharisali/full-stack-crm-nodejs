const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
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
  res.status(201).json({
    success: "true",
    msg: "user regustered successfully",
    user,
    token,
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
  res.status(200).json({
    success: "true",
    msg: "login successfully",
    token,
  });
};
module.exports = { register, login };
