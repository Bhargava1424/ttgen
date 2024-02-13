// backend/models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  teachers: [{
    type: mongoose.Schema.Types.Array,
    ref: 'Teacher'
  }],
  credits: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('course', courseSchema, 'course');
