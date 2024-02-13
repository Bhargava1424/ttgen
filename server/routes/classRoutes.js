// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); // Adjust path as necessary

// Endpoint to add a new class
router.post('/classes', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Optionally, add more routes as needed

module.exports = router;
