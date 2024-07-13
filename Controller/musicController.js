const Music = require("../Model/artistSchema/musicModel");

module.exports = {
  addSong: async (req, res) => {
    try {
      const { songName, artistName, artistId, album, musicCategory } = req.body;
      if (!req.files || !req.files.songImage || !req.files.musicAudio) {
        return res.status(400).send("Missing required files");
      }
      const songImage = req.files.songImage[0].filename;
      const musicAudio = req.files.musicAudio[0].filename;
      const newSong = new Music({
        songImage,
        songName,
        artistName,
        artistId,
        album,
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

  getArtistSongs: async (req, res) => {
    const { artistId } = req.params;
    try {
      const songs = await Music.find({ artistId });
      res.json(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      res.status(500).json({ error: "Error fetching songs" });
    }
  },

  getLatestSongs: async (req, res) => {
    try {
      const latestSongs = await Music.find().sort({ _id: -1 }).limit(8);
      res.json(latestSongs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest songs", error });
    }
  },
};
