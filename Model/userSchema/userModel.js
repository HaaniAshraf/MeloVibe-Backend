const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otpVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("users", signupSchema);
module.exports = User;
