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
    default: Date.now,
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

orderSchema.pre("save", function (next) {
  now = new Date();
  this.date = now;
  next();
});

module.exports = mongoose.model("orders", orderSchema);
