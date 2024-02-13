// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
// const bcrypt = require('bcrypt');

// Login endpoint
router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // // // Compare the entered password with the hashed password in the database
    // const passwordMatch = await compare(password, user.password);

    if (password != user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If the username and password are correct, send a success response
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
