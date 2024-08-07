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
  updateProfile,
} = require("../Controller/artistController");
const { addSong, getArtistSongs } = require("../Controller/musicController");
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
  .post("/newPassword", newArtistPassword)
  .put("/updateProfile/:id", upload.single("profileImg"), updateProfile)
  .post(
    "/addSong",
    upload.fields([{ name: "songImage" }, { name: "musicAudio" }]),
    addSong
  )
  .get('/songs/:artistId',getArtistSongs)

module.exports = router;
