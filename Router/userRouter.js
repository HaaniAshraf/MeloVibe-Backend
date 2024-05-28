const express = require("express");
const router = express.Router();

const {
  loginPost,
  signupPost,
  otpPost,
} = require("../Controller/userController");
const { logVerify, signVerify } = require("../Middleware/auth");

router
  .post("/login", logVerify, loginPost)
  .post("/signup", signVerify, signupPost)
  .post("/otp", otpPost);

module.exports = router;
