const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: Number,
  address: String,
  status: {
    type: String,
    default: "created",
  },
});

module.exports = mongoose.model("orders", orderSchema);
