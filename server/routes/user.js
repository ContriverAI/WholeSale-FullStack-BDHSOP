// imports
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models/userModel");
const userAuth = require("../middleware/userAuth");

// creaing new user
router.post("/user-sign-up", async (req, res) => {
  try {
    if (
      !req.body.email.trim() ||
      !req.body.password.trim() ||
      !req.body.userName.trim()
    ) {
      return res.send({
        message: "Basic data is required.",
        success: false,
      });
    }
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.send({
        message: "Email already exist.",
        success: false,
      });
    }
    const newUser = new userModel(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const response = await newUser.save();
    const id = newUser._id.toString();
    const token = jwt.sign({ id }, "TESTKEY", {
      algorithm: "HS256",
    });
    return res.send({ token: token, user: response, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

// signining in existing user
router.post("/user-sign-in", async (req, res) => {
  try {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res.send({
        message: "Email or password can't be empty.",
        success: false,
      });
    }
    const userExist = await userModel.findOne(
      { email: req.body.email },
      { userName: 1, email: 1, password: 1, address: 1 }
    );
    if (!userExist) {
      return res.send({
        message: "Account doesn't exist.",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!validPassword) {
      return res.send({
        message: "Wrong credentials.",
        success: false,
      });
    }
    const id = userExist._id.toString();
    const token = jwt.sign({ id }, "TESTKEY", {
      algorithm: "HS256",
    });
    userExist.password = "********";
    return res.send({ token: token, user: userExist, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

// getting items of users
router.get("/items", userAuth, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId, { _id: 1 })
      .populate("products");
    if (!user) {
      return res.send({
        message: "Something went wrong, please try again",
        success: false,
      });
    }
    return res.send({
      data: user,
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

// export
module.exports = router;
