// routes/deptRoutes.js
const express = require('express');
const Dept = require('../models/Dept');
const router = express.Router();

// Endpoint to add a new department
router.post('/depts', async (req, res) => {
  try {
    const dept = new Dept(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Optionally, add endpoints to get/update/delete departments as needed

module.exports = router;
