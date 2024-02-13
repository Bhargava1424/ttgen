// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
    default: 60,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
