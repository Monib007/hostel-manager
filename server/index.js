const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies


// Test Route
app.get('/', (req, res) => {
  res.send('Hostel Management API is running');
});


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});