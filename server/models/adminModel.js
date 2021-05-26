const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
  address: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("admins", adminSchema);
