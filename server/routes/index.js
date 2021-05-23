// imports
const express = require("express");
const userRoute = require("./user");
const adminRoute = require("./admin");
const itemRoute = require("./item");

// constructor for router
const router = express.Router();

// router use
router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/item", itemRoute);

// exports
module.exports = router;
