const Artist = require("../Model/artistSchema/artistModel");

module.exports = {
  artistLoginPost: async (req, res) => {
    try {
      const { email } = req.body;
      res
        .status(200)
        .json({
          success: true,
          message: "User created successfully",
          data: email,
        });
    } catch (error) {
      console.error("Artist signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  artistSignupPost: async (req, res) => {
    try {
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Artist signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  artistHomeGet: async (req, res) => {
    try {
      const { email } = req.params;
      const artist = await Artist.findOne({ email });
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.status(200).json({ success: true, data: artist });
    } catch (error) {
      console.error("Error fetching artist data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
