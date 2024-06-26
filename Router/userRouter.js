const express = require("express");
const router = express.Router();

const {
  loginPost,
  userToken,
  signupPost,
  otpUser,
  forgotPasswordUser,
  newUserPassword,
  logoutUser,
  protectedUser,
  userProfileGet
} = require("../Controller/userController");
const { logVerify, signVerify } = require("../Middleware/validate");
const verifyToken = require("../Middleware/authentication");

router
  .post("/login", logVerify, loginPost)
  .post("/signup", signVerify, signupPost)
  .post("/user/otp", otpUser)
  .post("/user/inputEmail", forgotPasswordUser)
  .post("/user/newPassword", newUserPassword)

module.exports = router;
