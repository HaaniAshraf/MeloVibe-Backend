const express = require("express");
const router = express.Router();

const {
  adminLoginPost,
  adminSignupPost,
  otpAdmin,
} = require("../Controller/adminController");
const { adminLogVerify, adminSignverify } = require("../Middleware/auth");

router
  .post("/login", adminLogVerify, adminLoginPost)
  .post("/signup", adminSignverify, adminSignupPost)
  .post("/otp", otpAdmin);

module.exports = router;
