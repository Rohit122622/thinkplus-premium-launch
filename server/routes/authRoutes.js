const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, profileImage });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        profileImage: user.profileImage // Added profileImage
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Google OAuth login
router.post("/google-login", async (req, res) => {
  try {
    const { email, name, profileImage } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    let user = await User.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      // Generate a secure random password for OAuth users
      const randomPassword = Math.random().toString(36).slice(-8) + Date.now().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: profileImage || "", // Use provided image or empty string
      });
      await user.save();
    } else {
      // Update profile image if provided and user exists
      if (profileImage && user.profileImage !== profileImage) {
        user.profileImage = profileImage;
        await user.save();
      }
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Error with Google login" });
  }
});

// Apple OAuth login
router.post("/apple-login", async (req, res) => {
  try {
    const { email, name, profileImage } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Generate a secure random password for OAuth users
      const randomPassword = Math.random().toString(36).slice(-8) + Date.now().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      user = new User({
        name: name || "Apple User", // Apple might not always provide name
        email,
        password: hashedPassword,
        profileImage: profileImage || "",
      });
      await user.save();
    } else {
      // Update profile image if provided
      if (profileImage && user.profileImage !== profileImage) {
        user.profileImage = profileImage;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Apple login error:", error);
    res.status(500).json({ message: "Error with Apple login" });
  }
});

module.exports = router;