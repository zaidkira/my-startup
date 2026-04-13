const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Handle preflight requests for all routes
app.options('*', cors());

// Connect to database in serverless environment
let isConnected = false;
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    next();
});

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Vitalis API is Live on Vercel API Route! 🚀' });
});

// Import Routes
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/vitals', require('../routes/vitalRoutes'));
app.use('/api/inventory', require('../routes/inventoryRoutes'));
app.use('/api/prescriptions', require('../routes/prescriptionRoutes'));
app.use('/api/records', require('../routes/recordRoutes'));
app.use('/api/medications', require('../routes/medicationRoutes'));

module.exports = app;
