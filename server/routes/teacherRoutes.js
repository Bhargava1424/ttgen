// backend/routes/teacherRoutes.js

const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Endpoint to add a new teacher
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  
  router.post('/teachers', async (req, res) => {
    try {
      const newTeacher = new Teacher({
        tid: req.body.tid,
        name: req.body.name
      });
      const savedTeacher = await newTeacher.save();
      res.status(201).json(savedTeacher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
