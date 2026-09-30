const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  subject: String,
  pdfLink: String
});

module.exports = mongoose.model("Book", bookSchema);