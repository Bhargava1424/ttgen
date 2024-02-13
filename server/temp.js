// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes'); // Import the signup route
const loginRoutes = require('./routes/loginRoutes'); // Import the login route

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/ttgen', { useNewUrlParser: true, useUnifiedTopology: true });

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
    // Send a success response
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Use the login and signup routes
app.use(authRoutes);
app.use(loginRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
