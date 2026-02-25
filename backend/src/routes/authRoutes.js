const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const oauth2Client = require("../config/google"); // make sure this exports OAuth2Client

const router = express.Router();

/*
=====================================
STEP 1 — Redirect user to Google
=====================================
*/
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // required for refresh token
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

    // Get user profile info
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const user = {
      email: userInfo.data.email,
      name: userInfo.data.name,
      picture: userInfo.data.picture,
    };

    // Create JWT (7 day session)
    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    /*
    TEMPORARY TOKEN STORAGE (Memory)
    ⚠️ This will reset when server restarts
    We will replace this with DB later
    */
    global.userSessions = global.userSessions || {};
    global.userSessions[user.email] = tokens;

    // Send secure HTTP-only cookie
    res.cookie("neoflow_token", jwtToken, {
      httpOnly: true,
      secure: true,       // required for HTTPS (Render + Vercel)
      sameSite: "none",   // required for cross-domain
    });

    // Redirect to frontend dashboard
    res.redirect("https://neoflow-x.vercel.app/");

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).send("Authentication Failed");
  }
});

module.exports = router;