// routes/timeslotRoutes.js
const express = require('express');
const router = express.Router();
const Timeslot = require('../models/Timeslot'); // Adjust path as necessary

// Endpoint to add a new timeslot
router.post('/timeslots', async (req, res) => {
  try {
    const newTimeslot = new Timeslot(req.body);
    const savedTimeslot = await newTimeslot.save();
    res.status(201).json(savedTimeslot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/timeslots', async (req, res) => {
  try {
    const timeslots = await Timeslot.find({});
    res.json(timeslots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching timeslots", error: error.message });
  }
});

// Optionally, add endpoints to get/update/delete timeslots as needed

module.exports = router;
