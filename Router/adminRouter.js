const express = require("express");
const router = express.Router();

const {
  adminLoginPost,
  adminSignupPost,
  otpAdmin,
  forgotPasswordAdmin,
  newAdminPassword,
} = require("../Controller/adminController");
const { adminLogVerify, adminSignverify } = require("../Middleware/auth");

router
  .post("/login", adminLogVerify, adminLoginPost)
  .post("/signup", adminSignverify, adminSignupPost)
  .post("/otp", otpAdmin)
  .post("/inputEmail", forgotPasswordAdmin)
  .post("/newPassword", newAdminPassword);

module.exports = router;
