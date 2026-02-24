const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const oauth2Client = require("../config/google");

/*
---------------------------------------------------
GET /api/gmail/inbox
Fetch latest 5 emails (subject, from, snippet)
---------------------------------------------------
*/
router.get("/inbox", async (req, res) => {
  try {
    oauth2Client.setCredentials(global.googleTokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const list = await gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    });

    const messages = list.data.messages || [];

    const emailDetails = await Promise.all(
      messages.map(async (msg) => {
        const message = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers = message.data.payload.headers;

        const subject = headers.find(
          (h) => h.name === "Subject"
        )?.value;

        const from = headers.find(
          (h) => h.name === "From"
        )?.value;

        return {
          id: msg.id,
          subject,
          from,
          snippet: message.data.snippet,
        };
      })
    );

    res.json(emailDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
});

/*
---------------------------------------------------
POST /api/gmail/send
Send email
---------------------------------------------------
*/
router.post("/send", async (req, res) => {
  try {
    oauth2Client.setCredentials(global.googleTokens);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        message: "To, subject and message are required",
      });
    }

    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    res.json({ message: "Email sent successfully 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;