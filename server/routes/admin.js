// imports
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const adminModel = require("../models/adminModel");
const adminAuth = require("../middleware/adminAuth");
const itemModel = require("../models/itemModel");
const orderModel = require("../models/orderModel");

router.post("/admin-sign-up", async (req, res) => {
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
    const adminExist = await adminModel.findOne({ email: req.body.email });
    if (adminExist) {
      return res.send({
        message: "Email already exist.",
        success: false,
      });
    }
    const newAdmin = new adminModel(req.body);
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
    const response = await newAdmin.save();
    const id = newAdmin._id.toString();
    const token = jwt.sign({ id }, "TESTKEY", {
      algorithm: "HS256",
    });
    return res.send({ token: token, admin: response, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.post("/admin-sign-in", async (req, res) => {
  try {
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res.send({
        message: "Email or password can't be empty.",
        success: false,
      });
    }
    const adminExist = await adminModel.findOne({ email: req.body.email });
    if (!adminExist) {
      return res.send({
        message: "Account doesn't exist.",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      adminExist.password
    );
    if (!validPassword) {
      return res.send({
        message: "Wrong credentials.",
        success: false,
      });
    }
    const id = adminExist._id.toString();
    const token = jwt.sign({ id }, "TESTKEY", {
      algorithm: "HS256",
    });
    return res.send({ token: token, admin: adminExist, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/PendingItems", adminAuth, async (req, res) => {
  try {
    const items = await itemModel
      .find({ status: "pending" })
      .populate("clientID", {
        userName: 1,
        email: 1,
        mobile: 1,
        accountVerified: 1,
        address: 1,
        state: 1,
        country: 1,
      })
      .sort({ date: -1 });
    if (!items) {
      return res.send({
        message: "Something went wrong, please try again",
        success: false,
      });
    }
    return res.send({
      data: items,
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/Order/:id", adminAuth, async (req, res) => {
  try {
    const orders = await orderModel
      .findById(req.params.id)
      .populate("products")
      .populate("user", {
        accountVerified: 1,
        email: 1,
        userName: 1,
        mobile: 1,
      });
    if (!orders) {
      return res.send({
        message: "Something wemt wrong, try again",
        success: false,
      });
    }
    return res.send({ orders, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/Orders/:type", adminAuth, async (req, res) => {
  try {
    const orders = await orderModel
      .find({ status: req.params.type })
      .sort({ date: -1 });
    if (!orders) {
      return res.send({
        message: "Something wemt wrong, try again",
        success: false,
      });
    }
    return res.send({ orders, success: true });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

// export
module.exports = router;
