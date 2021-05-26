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
    const newItem = new itemModel(req.body);
    newItem.clientID = user._id;
    user.products.unshift(newItem);
    newItem.save();
    user.save();
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

router.post("/update-status/:itemId", adminAuth, async (req, res) => {
  try {
    const id = req.params.itemId;
    const existingItem = await itemModel.findById(id);
    const admin = await adminModel.findById(req.adminId);
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
module.exports = router;
