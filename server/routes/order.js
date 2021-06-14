const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const userAuth = require("../middleware/userAuth");
const itemModel = require("../models/itemModel");

// getting user order
router.get("/my-orders", userAuth, async (req, res) => {
  try {
    // const test = await orderModel
    //   .find({ user: req.userId })
    //   .populate("products");
    // return res.send(test);
    // console.log(test);
    const user = await userModel
      .findById(req.userId, { orders: 1 })
      .populate("orders");
    if (!user) {
      return res.send({
        message: "Something went wrong, please try again.",
        success: false,
      });
    }
    const records = await itemModel.find({
      _id: { $in: user.orders[0].products },
    });

    Promise.all(
      user.orders.map((item, i) => {
        return itemModel.find({
          _id: { $in: user.orders[i].products },
        });
      })
    ).then((result) => res.send({ user, result, success: true }));
    // // const items =
    // return res.send({
    //   // user,
    //   // records2,
    //   success: true,
    // });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

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

// updating payment screenshot
router.post("/update-payment/:id", userAuth, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.send({
        message: "Order not found",
        success: false,
      });
    }
    if (order.user.toString() !== req.userId.toString()) {
      return res.send({
        message: "Unauthorized",
        success: false,
      });
    }
    order.paymentImage = req.body.payment;
    order.paymentStatus = "payment submitted";
    await order.save();
    return res.send({
      message: "Payment Updated",
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.post("/update-order/:id", userAuth, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.send({
        message: "Order not found",
        success: false,
      });
    }
    order.paymentStatus = req.body.paymentStatus;
    order.status = req.body.status;
    await order.save();
    return res.send({
      message: "Order Updated",
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
