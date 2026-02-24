const express = require("express");
const router = express.Router();
const oauth2Client = require("../config/google");

// Step 1: Redirect user to Google login
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/calendar",
    ],
  });

  res.redirect(url);
});

// Step 2: Google callback
router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  global.googleTokens = tokens;

  res.json({
  message: "Google Authentication Successful 🚀",
  tokens,
});
});

module.exports = router;