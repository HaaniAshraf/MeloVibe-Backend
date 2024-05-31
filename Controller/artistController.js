const Artist = require("../Model/artistSchema/artistModel");
const mongoose = require("mongoose");

module.exports = {
  artistLoginPost: async (req, res) => {
    try {
      const { email } = req.body;
      const artist = await Artist.findOne({ email });
      res.status(200).json({
        success: true,
        message: "Artist created successfully",
        data: artist._id,
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

  otpArtist: async (req, res) => {
    const { otp, action } = req.body;
    try {
      if (action === "verify") {
        const sessionOtp = req.session.otp.toString();
        if (otp !== sessionOtp) {
          return res.status(400).json({ error: "OTP doesn't match" });
        }
        const artist = await Artist.findOne({ email: req.session.email });
        if (!artist) {
          return res.status(400).json({ error: "Artist not found" });
        }
        artist.otpVerified = true;
        await artist.save();
        res.status(200).json({
          success: true,
          message: "OTP verified and artist registered",
        });
      } else if (action === "resend") {
        const otp = Math.floor(Math.random() * 9000) + 1000;
        console.log("resendOtp:", otp);
        req.session.otp = otp;
        emailverification(req.session.email, otp);
        return res.status(200).json({ success: true, message: "OTP resent" });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Invalid action" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  artistHomeGet: async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findById(id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.status(200).json({ success: true, data: artist });
    } catch (error) {
      console.error("Error fetching artist data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  artistProfileGet: async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findById(id);
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
