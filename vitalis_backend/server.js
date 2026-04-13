const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Vitalis Health API - صحتك أولاً' });
});

// Import Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/vitals', require('./routes/vitalRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Vitalis API running on port ${PORT}`);
});

module.exports = app;
