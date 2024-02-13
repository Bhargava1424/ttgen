// models/Timeslot.js
const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
  timeslotId: {
    type: String,
    required: true,
    unique: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  // Add other properties as necessary
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = Timeslot;
