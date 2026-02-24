const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const oauth2Client = require("../config/google");

router.get("/events", async (req, res) => {
  try {
    oauth2Client.setCredentials(global.googleTokens);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items.map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
    }));

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch calendar events" });
  }
});

module.exports = router;