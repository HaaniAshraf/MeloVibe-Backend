const Admin = require("../Model/adminSchema/adminModel");
const { emailverification } = require("../Utilities/nodemailer");

module.exports = {
  adminLoginPost: async (req, res) => {
    try {
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  adminSignupPost: async (req, res) => {
    try {
      res
        .status(200)
        .json({ success: true, message: "Admin created successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  otpAdmin: async (req, res) => {
    const { otp, action } = req.body;
    try {
      if (action === "verify") {
        const sessionOtp = req.session.otp.toString();
        if (otp !== sessionOtp) {
          return res.status(400).json({ error: "OTP doesn't match" });
        }
        const admin = await Admin.findOne({ email: req.session.email });
        if (!admin) {
          return res.status(400).json({ error: "Admin not found" });
        }
        admin.otpVerified = true;
        await admin.save();
        res
          .status(200)
          .json({ success: true, message: "OTP verified and user registered" });
      } else if (action === "resend") {
        const otp = Math.floor(Math.random() * 9000);
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
};
