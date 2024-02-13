// loginRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username and password match in the database
    const user = await User.findOne({ username, password });
    console.log(user);
    if (user) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
