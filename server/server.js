const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import the User model

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(express.json());

// Sign-up endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, mobile } = req.body;

    // Create a new user document
    const newUser = new User({
      username,
      password,
      mobile,
    });

    // Save the user to MongoDB
    await newUser.save();

    // Redirect to login page
    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
