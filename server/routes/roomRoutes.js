// routes/roomRoutes.js
const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Endpoint to add a new room
router.post('/rooms', async (req, res) => {
  try {
    // Ensure that each room has a seating capacity of 60
    const roomData = { ...req.body, seatingCapacity: 60 };
    const room = new Room(roomData);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/rooms', async (req, res) => {
  try {
    const allRooms = await Room.find({});
    res.json(allRooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

// Optionally, add endpoints to get/update/delete rooms as needed

module.exports = router;
