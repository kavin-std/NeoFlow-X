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

    const tokens = global.userSessions?.[req.user.email];

    if (!tokens) {
      return res.status(401).json({
        message: "Google session expired. Please login again.",
      });
    }

    oauth2Client.setCredentials(tokens);

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
Write and Send (Structured)
-------------------------------
*/
router.post("/write-and-send", async (req, res) => {
  try {
    const {
      to,
      context,
      subject,
      tone,
      reason,
      dueDate,
      dueTime,
      links,
      comments,
    } = req.body;

    if (!to || !subject || !context || !tone) {
      return res.status(400).json({
        message: "to, subject, context and tone are required",
      });
    }

    const tokens = global.userSessions?.[req.user.email];

    if (!tokens) {
      return res.status(401).json({
        message: "Google session expired. Please login again.",
      });
    }

    oauth2Client.setCredentials(tokens);

    const prompt = `
Write a professional business email with the following structured details:

Subject: ${subject}
Main Context: ${context}
Tone: ${tone}

Reason: ${reason || "Not specified"}
Due Date: ${dueDate || "Not specified"}
Due Time: ${dueTime || "Not specified"}
Relevant Links: ${links || "None"}
Additional Comments: ${comments || "None"}

Make it clear, structured, and professional.
Include greeting and polite closing.
`;

    const generatedEmail = await geminiService.generateContent(prompt);

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "",
      generatedEmail,
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
      message: "Structured AI email generated and sent successfully 🚀",
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