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
  userProfileGet,
} = require("../Controller/userController");
const { getLatestSongs } = require("../Controller/musicController");
const { logVerify, signVerify } = require("../Middleware/validate");
const verifyToken = require("../Middleware/authentication");

router
  .post("/login", logVerify, loginPost)
  .post("/signup", signVerify, signupPost)
  .post("/user/otp", otpUser)
  .post("/user/inputEmail", forgotPasswordUser)
  .post("/user/newPassword", newUserPassword)
  .get("/latestSongs", getLatestSongs);

module.exports = router;
