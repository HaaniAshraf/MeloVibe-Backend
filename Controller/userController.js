const User = require("../Model/userSchema/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  signupGet: (req, res) => {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signupPost: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          userName,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        res
          .status(201)
          .json({ success: true, message: "User created successfully" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
