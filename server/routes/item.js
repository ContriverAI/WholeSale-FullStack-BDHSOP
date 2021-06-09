// imports
const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModel");
const itemModel = require("../models/itemModel");
const userModel = require("../models/userModel");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

router.get("/", userAuth, (req, res) => {
  res.send({ msg: req.userId });
});

router.post("/create-item", userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.send({
        message: "Something went wrong, please try again.",
        success: false,
      });
    }
    const newItem = new itemModel({ ...req.body, date: new Date() });
    newItem.clientID = user._id;
    user.products.unshift(newItem);
    await newItem.save();
    await user.save();
    return res.send({
      message: "Item created",
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/item/:itemId", async (req, res) => {
  try {
    const item = await itemModel
      .findById(req.params.itemId)
      .populate("clientID", {
        accountVerifie: 1,
        address: 1,
        email: 1,
        mobile: 1,
        userName: 1,
        state: 1,
      });
    if (!item) {
      return res.send({
        message: "Item doesn't exist.",
        success: false,
      });
    }
    return res.send({
      item,
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.post("/update-status/:itemId", adminAuth, async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.itemId;
    const existingItem = await itemModel.findById(id);
    const admin = await adminModel.findById(req.adminId);
    if (!req.body.amount.trim()) {
      return res.send({
        message: "Please specify amount.",
        success: false,
      });
    }
    if (!admin) {
      return res.send({
        message: "Something went wrong, please try again.",
        success: false,
      });
    }
    if (!existingItem) {
      return res.send({
        message: "Item doesn't exist.",
        success: false,
      });
    }
    existingItem.status = req.body.status;
    existingItem.approvedBy = admin;
    existingItem.deliveryCharges = req.body.deliveryCharges;
    existingItem.shippingDays = req.body.shippingDays;
    existingItem.deliveryDate = req.body.deliveryDate;

    if (req.body.status === "approved") existingItem.amount = req.body.amount;
    admin.approvedItems.unshift(id);
    await admin.save();
    await existingItem.save();
    return res.send({
      message: "Item updated.",
      success: true,
    });
  } catch (err) {
    return res.send({
      message: err.message,
      success: false,
    });
  }
});

router.post("/delete-item/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(req.userId);
    const existItem = await itemModel.findById(id);
    if (!existItem) {
      return res.send({
        message: "Item doesn't exist.",
        success: false,
      });
    }
    if (user._id.toString() !== existItem.clientID.toString()) {
      return res.send({ message: "Not Authorized", success: false });
    }

    if (!Boolean(user.products.find((item) => item.toString() === id))) {
      return res
        .status(404)
        .send({ message: "Item Doesn't Exist", success: false });
    }

    const removeItemIndex = user.products
      .map((item) => item.toString())
      .indexOf(id);
    console.log(removeItemIndex);
    console.log(user.products.find((item) => item.toString() === id));
    user.products.splice(removeItemIndex, 1);

    await user.save();
    await itemModel.findByIdAndDelete(id);
    return res.send({ message: "Item deleted", success: true });
  } catch (err) {
    res.send({
      message: err.message,
      success: false,
    });
  }
});

router.get("/test-aggregate", async (req, res) => {
  try {
    const resp = await userModel.aggregate(
      [
        {
          $unwind: {
            path: "$products",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "products",
            foreignField: "_id",
            as: "ProductData",
          },
        },
        {
          $project: {
            ProductData: 1.0,
          },
        },
        {
          $unwind: {
            path: "$ProductData",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "admins",
            localField: "ProductData.approvedBy",
            foreignField: "_id",
            as: "approval",
          },
        },
      ]
      // {
      //   allowDiskUse: false,
      // }
    );

    return res.send(resp);
  } catch (err) {
    return res.send(err);
  }
});
module.exports = router;
