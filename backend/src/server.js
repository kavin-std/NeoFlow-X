const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const gmailRoutes = require("./routes/gmailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const calendarRoutes = require("./routes/calendarRoutes");

const app = express();

app.use(cors({
  origin: "https://neoflow-x.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/gmail", gmailRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("NeoFlow X Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});