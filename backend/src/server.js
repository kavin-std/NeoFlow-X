const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const mongoose = require("mongoose");

const verifyToken = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const gmailRoutes = require("./routes/gmailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const calendarRoutes = require("./routes/calendarRoutes");

const app = express();

// CORS configuration
app.use(cors({
  origin: "https://neoflow-x.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Public auth routes
app.use("/auth", authRoutes);

// Protected API routes
app.use("/api/gmail", verifyToken, gmailRoutes);
app.use("/api/ai", verifyToken, aiRoutes);
app.use("/api/calendar", verifyToken, calendarRoutes);

app.get("/", (req, res) => {
  res.send("NeoFlow X Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});