const Vital = require('../models/Vital');

// Get all vitals for a patient
exports.getVitals = async (req, res) => {
    try {
        const vitals = await Vital.find({ patient: req.params.patientId }).sort('-date');
        res.status(200).json(vitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new vital records (From patient dash)
exports.addVital = async (req, res) => {
    try {
        const newVital = new Vital({
            ...req.body,
            patient: req.params.patientId
        });
        const savedVital = await newVital.save();
        res.status(201).json(savedVital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
