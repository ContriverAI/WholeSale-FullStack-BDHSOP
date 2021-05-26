const jwt = require("jsonwebtoken");
const mongoose = require("mongodb");
const userModel = require("../models/userModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(req.headers);
  if (!authorization) {
    return res
      .status(401)
      .send({ message: "You must log in first user", success: false });
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);
  jwt.verify(token, "TESTKEY", async (err, payload) => {
    if (err) {
      // console.log(err.message);
      return res
        .status(401)
        .send({ error: "You must login first user", success: false });
    }
    req.userId = payload.id;
    next();
  });
};
