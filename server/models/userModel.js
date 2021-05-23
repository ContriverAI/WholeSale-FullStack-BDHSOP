const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  mobile: Number,
  country: String,
  state: String,
  pin: String,
  accountVerified: {
    type: Boolean,
    default: false,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
    },
  ],
  address: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
