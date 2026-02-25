const model = require("../config/gemini");

/*
---------------------------------
Normal Mail Generator
---------------------------------
*/
const generateMailWithAI = async ({ reason, dueDate, tone }) => {
  const prompt = `
Write a professional email.

Reason: ${reason}
Due Date: ${dueDate}
Tone: ${tone}

Include:
- Proper subject line
- Clear explanation
- Polite closing
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

/*
---------------------------------
Generic Prompt Generator
Used for Smart Mail
---------------------------------
*/
const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = {
  generateMailWithAI,
  generateContent,
};