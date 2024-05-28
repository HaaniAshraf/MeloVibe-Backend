const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const User = require("../Model/userSchema/userModel");
const Artist = require("../Model/artistSchema/artistModel");
const bcrypt = require("bcrypt");
const { emailverification } = require("../Utilities/nodemailer");

const logVerify = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter email" });
  } else if (!password) {
    return res.status(400).json({ error: "Please enter password" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.status === "blocked") {
      return res
        .status(400)
        .json({ error: "Account blocked.Please Signup again" });
    }
    if (user.otpVerified === false) {
      const otp = Math.floor(Math.random() * 9000) + 1000;
      req.session.otp = otp;
      req.session.email = email;
      emailverification(email, otp);
      return res.status(400).json({
        error: "Please verify your account",
        redirect: true,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signVerify = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Please input a stronger password" });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(Math.random() * 9000) + 1000;
      emailverification(email, otp);
      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      req.session.otp = otp;
      console.log("OTP:", req.session.otp);
      req.session.email = newUser.email;
      return res.status(200).json({ message: "OTP sent to your email" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const artistLogVerify = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter email" });
  } else if (!password) {
    return res.status(400).json({ error: "Please enter password" });
  }
  try {
    const artist = await Artist.findOne({ email: email });
    if (!artist) {
      return res.status(400).json({ error: "Artist not found" });
    }
    if (artist.status === "blocked") {
      return res
        .status(400)
        .json({ error: "Account blocked.Please Signup again" });
    }
    const passwordMatch = await bcrypt.compare(password, artist.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const artistSignVerify = async (req, res, next) => {
  const profileImg = req.file ? req.file.filename : null;
  const { name, email, password } = req.body;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!profileImg || !name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Please input a stronger password" });
  }
  try {
    const existingArtist = await Artist.findOne({ email: email });
    if (existingArtist) {
      return res.status(400).json({ error: "Artist already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newArtist = new Artist({
        profileImg,
        name,
        email,
        password: hashedPassword,
      });
      await newArtist.save();
      const otp = Math.floor(Math.random() * 9000) + 1000;
      req.session.otp = otp;
      req.session.email = newArtist.email;
      emailverification(email, otp);
      return res.status(200).json({ message: "OTP sent to your email" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { logVerify, signVerify, artistLogVerify, artistSignVerify };
