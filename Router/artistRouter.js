const express = require("express");
const router = express.Router();
const upload = require("../Middleware/multer");

const {
  artistLoginPost,
  artistSignupPost,
  otpArtist,
  artistHomeGet,
} = require("../Controller/artistController");
const { artistLogVerify, artistSignVerify } = require("../Middleware/auth");

router
  .post("/login", artistLogVerify, artistLoginPost)
  .post(
    "/signup",
    upload.single("profileImg"),
    artistSignVerify,
    artistSignupPost
  )
  .post("/otp", otpArtist)
  .get("/artistHome/:email", artistHomeGet);

module.exports = router;
