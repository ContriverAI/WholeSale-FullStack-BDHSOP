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
    default: new Date(),
  },
  amount: Number,
  deliveryAmount: Number,
  deliveryDate: Date,
  total: Number,
  paymentImage: String,
  paymentStatus: {
    type: String,
    default: "under verification",
  },
  address: String,
  status: {
    type: String,
    default: "created",
  },
});

module.exports = mongoose.model("orders", orderSchema);
