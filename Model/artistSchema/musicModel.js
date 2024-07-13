const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  songImage: {
    type: String,
    required: true,
  },
  songName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: {
    type: String,
  },
  musicCategory: {
    type: String,
    required: true,
  },
  musicAudio: {
    type: String,
    required: true,
  },
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
