const express = require("express");
const router  = express.Router();
const axios   = require("axios");

router.post("/summary", async (req, res) => {
  const { title, author, subject } = req.body;
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        inputs: `For the book "${title}"${author ? ` by ${author}` : ""}${subject ? `, subject: ${subject}` : ""}, write a 2-sentence summary explaining why this book is useful for GATE CSE preparation. Reply with only the summary.`,
        parameters: { max_new_tokens: 150, return_full_text: false }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type":  "application/json"
        }
      }
    );
    const summary = response.data[0]?.generated_text || '';
    res.json({ summary: summary.trim() });
  } catch (err) {
    console.log("SUMMARY ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "AI summary failed" });
  }
});

router.post("/recommend", async (req, res) => {
  const { books } = req.body;
  try {
    const list = books.map(b =>
      `"${b.title}"${b.author ? ` by ${b.author}` : ""}${b.subject ? ` (${b.subject})` : ""}`
    ).join(", ");

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        inputs: `I am preparing for GATE CSE exam. My current books are: ${list}. Recommend exactly one book I should read next. Give the book title, author name, and 2 sentences explaining why it helps GATE CSE preparation.`,
        parameters: { max_new_tokens: 150, return_full_text: false }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type":  "application/json"
        }
      }
    );
    const recommendation = response.data[0]?.generated_text || '';
    res.json({ recommendation: recommendation.trim() });
  } catch (err) {
    console.log("RECOMMEND ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "AI recommendation failed" });
  }
});

module.exports = router;