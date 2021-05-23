// imports
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const adminModel = require("../models/adminModel");
const adminAuth = require("../middleware/adminAuth");
const itemModel = require("../models/itemModel");

router.post("/admin-sign-up", async (req, res) => {
  try {
    const adminExist = await adminModel.findOne({ email: req.body.email });
    if (adminExist) {
      return res.status(400).send({
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
    return res
      .status(201)
      .send({ token: token, admin: response, success: true });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      success: false,
    });
  }
});

router.post("/admin-sign-in", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Email or password can't be empty.",
        success: false,
      });
    }
    const adminExist = await adminModel.findOne({ email: req.body.email });
    if (!adminExist) {
      return res.status(400).send({
        message: "Account doesn't exist.",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      adminExist.password
    );
    if (!validPassword) {
      return res.status(400).send({
        message: "Wrong credentials.",
        success: false,
      });
    }
    const id = adminExist._id.toString();
    const token = jwt.sign({ id }, "TESTKEY", {
      algorithm: "HS256",
    });
    return res
      .status(201)
      .send({ token: token, admin: adminExist, success: true });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/items", adminAuth, async (req, res) => {
  try {
    const items = await itemModel.find({});
    if (!items) {
      return res.status(400).send({
        message: "Something went wrong, please try again",
        success: false,
      });
    }
    return res.status(400).send({
      data: items,
      success: true,
    });
  } catch {
    return res.status(400).send({
      message: err.message,
      success: false,
    });
  }
});

// export
module.exports = router;
