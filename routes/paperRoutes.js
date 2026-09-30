const express = require("express");
const router = express.Router();
const Paper = require("../models/Paper");

router.get("/", async (req, res) => {
  const papers = await Paper.find();
  res.json(papers);
});

router.post("/", async (req, res) => {
  const paper = new Paper(req.body);
  await paper.save();
  res.json(paper);
});

module.exports = router;