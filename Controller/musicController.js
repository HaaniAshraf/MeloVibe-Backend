const Music = require("../Model/artistSchema/musicModel");

module.exports = {
  addSong: async (req, res) => {
    try {
      const { songName, artistName, musicCategory } = req.body;
      const songImage = req.files.songImage[0].path;
      const musicAudio = req.files.musicAudio[0].path;
      const newSong = new Music({
        songImage,
        songName,
        artistName,
        musicCategory,
        musicAudio,
      });
      await newSong.save();
      res.status(201).send("Song added successfully");
    } catch (error) {
      console.error("Error saving song:", error);
      res.status(500).send("An error occurred while saving the song");
    }
  },
};
