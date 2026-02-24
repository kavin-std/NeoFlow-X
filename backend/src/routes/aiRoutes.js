const express = require("express");
const router = express.Router();
const { generateMail } = require("../controllers/aiController");
const { google } = require("googleapis");
const oauth2Client = require("../config/google");
const geminiService = require("../services/aiService");

/*
-------------------------------
Basic Mail
-------------------------------
*/
router.post("/generate-mail", generateMail);

/*
-------------------------------
Smart Mail (Calendar Aware)
-------------------------------
*/
router.post("/smart-mail", async (req, res) => {
  try {
    const { reason, tone } = req.body;

    oauth2Client.setCredentials(global.googleTokens);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 3,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    const eventSummary = events
      .map(e => `${e.summary} at ${e.start.dateTime || e.start.date}`)
      .join("\n");

    const prompt = `
User reason: ${reason}
Tone: ${tone}

Upcoming calendar events:
${eventSummary}

Generate a professional email considering the schedule above.
If there is conflict, suggest rescheduling politely.
`;

    const aiResponse = await geminiService.generateContent(prompt);

    res.json({ email: aiResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Smart mail generation failed" });
  }
});

/*
-------------------------------
Write and Send (Manual Context)
-------------------------------
*/
router.post("/write-and-send", async (req, res) => {
  try {
    const { to, context, tone } = req.body;

    if (!to || !context || !tone) {
      return res.status(400).json({
        message: "to, context and tone are required",
      });
    }

    oauth2Client.setCredentials(global.googleTokens);

    const prompt = `
Write a professional email.

Context:
${context}

Tone: ${tone}

Include:
- Proper subject line
- Clear explanation
- Polite closing
`;

    const generatedEmail = await geminiService.generateContent(prompt);

    const lines = generatedEmail.split("\n");
    const subjectLine = lines[0].replace("Subject:", "").trim();
    const body = lines.slice(1).join("\n");

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const email = [
      `To: ${to}`,
      `Subject: ${subjectLine}`,
      "",
      body,
    ].join("\n");

    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedEmail },
    });

    res.json({
      message: "AI email generated and sent successfully 🚀",
      email: generatedEmail,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Write and send failed" });
  }
});

/*
-------------------------------
Debug Route
-------------------------------
*/
router.get("/test", (req, res) => {
  res.send("AI route working");
});

module.exports = router;