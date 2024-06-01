const express = require("express");
const router = express.Router();
const upload = require("../Middleware/multer");

const {
  artistLoginPost,
  artistSignupPost,
  otpArtist,
  artistHomeGet,
  artistProfileGet,
  forgotPasswordArtist,
  newArtistPassword,
} = require("../Controller/artistController");
const { artistLogVerify, artistSignVerify } = require("../Middleware/validate");

router
  .post("/login", artistLogVerify, artistLoginPost)
  .post(
    "/signup",
    upload.single("profileImg"),
    artistSignVerify,
    artistSignupPost
  )
  .post("/otp", otpArtist)
  .get("/artistHome/:id", artistHomeGet)
  .get("/artistProfile/:id", artistProfileGet)
  .post("/inputEmail", forgotPasswordArtist)
  .post("/newPassword", newArtistPassword);

module.exports = router;
