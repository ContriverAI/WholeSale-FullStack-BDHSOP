const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  link: String,
  image: String,
  title: String,
  quantity: Number,
  amount: Number,
  shop: String,
  labels: [
    {
      label: String,
      value: String,
    },
  ],
  instruction: String,
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  purchaseStatus: {
    type: Boolean,
    default: false,
  },
  shippedStatus: {
    type: Boolean,
    default: false,
  },
  arrivedStatus: {
    type: Boolean,
    default: false,
  },
  deliveredStatus: {
    type: Boolean,
    default: false,
  },
  customsShipping: String,
  shippingTime: String,
  category: String,
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
  },
});

module.exports = mongoose.model("items", itemSchema);
