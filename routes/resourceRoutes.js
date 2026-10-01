const express = require("express");
const router = express.Router();
const Resource = require("../models/resource");

// Get all resources
router.get("/", async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

// Add resource
router.post("/", async (req, res) => {
  const resource = new Resource(req.body);
  await resource.save();
  res.json(resource);
});

module.exports = router;
