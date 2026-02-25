const { generateMailWithAI } = require("../services/aiService");

exports.generateMail = async (req, res) => {
  try {
    const { reason, dueDate, tone } = req.body;

    const aiResponse = await generateMailWithAI({
      reason,
      dueDate,
      tone,
    });

    res.json({
      success: true,
      email: aiResponse,
    });
  } catch (error) {
  console.error("FULL ERROR:", error);
  res.status(500).json({
    success: false,
    message: error.message,
  });
  }}