const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  exam: String,
  year: Number,
  subject: String,
  pdfLink: String
});

module.exports = mongoose.model("Paper", paperSchema);