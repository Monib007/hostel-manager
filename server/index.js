const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/studentRoutes')

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


app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});