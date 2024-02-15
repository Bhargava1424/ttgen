
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    if (password != user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // username and password are correct ayithe, send a success response 
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
