// models/Dept.js
const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
  deptId: {
    type: String,
    required: true,
    unique: true,
  },
  deptName: {
    type: String,
    required: true,
  },
  // Add other properties as necessary
});

const Dept = mongoose.model('Dept', deptSchema);

module.exports = Dept;
