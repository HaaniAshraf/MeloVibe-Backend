const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
});

const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
