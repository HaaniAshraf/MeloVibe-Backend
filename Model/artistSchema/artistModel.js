const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  profileImg: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
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

const Artist = mongoose.model("artists", artistSchema);
module.exports = Artist;
