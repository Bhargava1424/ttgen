// backend/models/Teacher.js

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  tid: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
}, { collection: 'teacher' });

const Teacher = mongoose.model('Teacher', teacherSchema,'teacher');

module.exports = Teacher;
