const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  subject : String,
  link: String
});

module.exports = mongoose.model("Resource", resourceSchema);