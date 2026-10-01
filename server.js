const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Make sure the database is connected before any API route runs
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/papers", require("./routes/paperRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));

module.exports = app;

// Only start a server when running locally (node server.js)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB().catch((err) => console.error(err));
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}