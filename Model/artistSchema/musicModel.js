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
    required: true,
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
