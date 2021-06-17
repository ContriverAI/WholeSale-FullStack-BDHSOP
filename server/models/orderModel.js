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
  notes: "",
  orderID: "",
});

orderSchema.pre("save", function (next) {
  now = new Date();
  this.date = now;
  var date = now;
  var components = [
    date.getFullYear().toString().slice(2, 4),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
  var id = components.join("");
  this.orderID = id;
  next();
});

module.exports = mongoose.model("orders", orderSchema);
