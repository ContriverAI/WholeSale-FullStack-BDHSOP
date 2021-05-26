const jwt = require("jsonwebtoken");
const mongoose = require("mongodb");
const adminModel = require("../models/adminModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);
  if (!authorization) {
    return res
      .status(401)
      .send({ message: "You must log in first admin", success: false });
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);
  jwt.verify(token, "TESTKEY", async (err, payload) => {
    if (err) {
      // console.log(err.message);
      return res
        .status(401)
        .send({ error: "You must login first admin", success: false });
    }
    req.adminId = payload.id;
    next();
  });
};
