const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const userAuth = require("../middleware/userAuth");

// creating a new order

router.post("/new-order", userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.send({
        message: "Something went wrong, please try again.",
        success: false,
      });
    }
    const userForBody = req.userId;
    const newOrder = new orderModel({ ...req.body, user: userForBody });
    user.orders.unshift(newOrder);
    await newOrder.save();
    await user.save();
    return res.send({
      message: "Order created",
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

module.exports = router;
