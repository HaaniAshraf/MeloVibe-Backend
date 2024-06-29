const Artist = require("../Model/artistSchema/artistModel");
const { emailverification } = require("../Utilities/nodemailer");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  artistLoginPost: async (req, res) => {
    try {
      const { email } = req.body;
      const artist = await Artist.findOne({ email });
      const token = jwt.sign({ id: artist.id }, secretKey, { expiresIn: "1h" });
      res.status(200).json({
        success: true,
        message: "Artist created successfully",
        token,
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

  forgotPasswordArtist: async (req, res) => {
    try {
      const email = req.body.email;
      req.session.email = email;
      const otp = Math.floor(Math.random() * 9000) + 1000;
      req.session.otp = otp;
      emailverification(req.session.email, otp);
      const artist = await Artist.findOne({ email: req.session.email });
      if (!artist) {
        return res.status(400).json({ error: "Artist not found" });
      }
      req.session.artistId = new ObjectId(artist._id);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error during input email:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  newArtistPassword: async (req, res) => {
    try {
      const artistId = req.session.artistId;
      const { password, cpassword } = req.body;
      if (!password || !cpassword) {
        return res
          .status(400)
          .json({ error: "Both password fields are required" });
      }
      if (password !== cpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await Artist.findByIdAndUpdate(artistId, { password: hashedPassword });
      res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
      });
    } catch (error) {
      console.error("Error during new password:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateProfile: async (req, res) => {
    const { id } = req.params;
    const { name, phone, dob } = req.body;
    let updateData = { name, phone, dob };
    if (req.file) {
      updateData.profileImg = req.file.filename;
    }
    try {
      const artist = await Artist.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res
        .status(200)
        .json({ message: "Profile updated successfully", data: artist });
    } catch (error) {
      console.error("Error updating artist profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

};
