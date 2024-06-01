const User = require("../Model/userSchema/userModel");
const { emailverification } = require("../Utilities/nodemailer");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");

module.exports = {
  loginPost: async (req, res) => {
    try {
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signupPost: async (req, res) => {
    try {
      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  otpUser: async (req, res) => {
    const { otp, action } = req.body;
    try {
      if (action === "verify") {
        const sessionOtp = req.session.otp.toString();
        if (otp !== sessionOtp) {
          return res.status(400).json({ error: "OTP doesn't match" });
        }
        const user = await User.findOne({ email: req.session.email });
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }
        user.otpVerified = true;
        await user.save();
        res
          .status(200)
          .json({ success: true, message: "OTP verified and user registered" });
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

  forgotPasswordUser: async (req, res) => {
    try {
      const email = req.body.email;
      req.session.email = email;
      const otp = Math.floor(Math.random() * 9000) + 1000;
      req.session.otp = otp;
      emailverification(req.session.email, otp);
      const user = await User.findOne({ email: req.session.email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      req.session.userId = new ObjectId(user._id);
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error during input email:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  newUserPassword: async (req, res) => {
    try {
      const userId = req.session.userId;
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
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
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
};
