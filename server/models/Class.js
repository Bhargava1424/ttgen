// models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true,
  },
  // Include other fields as necessary
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
