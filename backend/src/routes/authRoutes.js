const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const oauth2Client = require("../config/google");

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

    const user = {
      email: userInfo.data.email,
      name: userInfo.data.name,
      picture: userInfo.data.picture,
    };

    // Create JWT
    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Temporary in-memory token store
    global.userSessions = global.userSessions || {};
    global.userSessions[user.email] = tokens;

    // ✅ FIXED COOKIE CONFIG
    res.cookie("neoflow_token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",              // IMPORTANT
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("https://neoflow-x.vercel.app/");

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
  const token = req.cookies.neoflow_token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

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

/*
=====================================
LOGOUT
=====================================
*/
router.post("/logout", (req, res) => {
  res.clearCookie("neoflow_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",   // must match cookie path
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;