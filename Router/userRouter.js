const express = require("express");
const router = express.Router();

const {
  loginPost,
  signupPost,
  otpUser,
  forgotPasswordUser,
  newUserPassword,
} = require("../Controller/userController");
const { logVerify, signVerify } = require("../Middleware/auth");

router
  .post("/login", logVerify, loginPost)
  .post("/signup", signVerify, signupPost)
  .post("/user/otp", otpUser)
  .post("/user/inputEmail", forgotPasswordUser)
  .post("/user/newPassword", newUserPassword);

module.exports = router;
