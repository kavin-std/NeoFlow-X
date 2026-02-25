const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const gmailRoutes = require("./routes/gmailRoutes");
const aiRoutes = require("./routes/aiRoutes"); // 👈 Add this
const calendarRoutes = require("./routes/calendarRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/gmail", gmailRoutes);
app.use("/auth", authRoutes);

// 👇 Add this line
app.use("/api/ai", aiRoutes);
app.use("/api/calendar", calendarRoutes);

app.get("/", (req, res) => {
  res.send("NeoFlow X Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});