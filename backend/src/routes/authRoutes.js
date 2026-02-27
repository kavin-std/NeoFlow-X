const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const oauth2Client = require("../config/google");
const User = require("../models/User");

const router = express.Router();

/*
=====================================
STEP 1 — Redirect user to Google
=====================================
*/
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/calendar",
    ],
  });

  res.redirect(url);
});

/*
=====================================
STEP 2 — Google Callback
=====================================
*/
router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Authorization code missing");
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const userData = {
      email: userInfo.data.email,
      name: userInfo.data.name,
      picture: userInfo.data.picture,
    };

    // 🔥 SAVE OR UPDATE USER IN MONGODB
    await User.findOneAndUpdate(
      { email: userData.email },
      {
        ...userData,
        googleTokens: tokens,
      },
      { upsert: true, new: true }
    );

    // Create JWT
    const jwtToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Dynamic frontend redirect
    const FRONTEND_URL =
      process.env.FRONTEND_URL || "http://localhost:5173";

    return res.redirect(`${FRONTEND_URL}/?token=${jwtToken}`);

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).send("Authentication Failed");
  }
});

/*
=====================================
GET CURRENT USER
=====================================
*/
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ authenticated: false });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      authenticated: true,
      user: decoded,
    });

  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
});

module.exports = router;