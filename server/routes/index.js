// imports
const express = require("express");
const userRoute = require("./user");
const adminRoute = require("./admin");
const itemRoute = require("./item");
const orderRoute = require("./order");

// constructor for router
const router = express.Router();

// router use
router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/item", itemRoute);
router.use("/order", orderRoute);

// exports
module.exports = router;
