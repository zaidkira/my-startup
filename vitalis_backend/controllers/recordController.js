const MedicalRecord = require('../models/MedicalRecord');

exports.getRecords = async (req, res) => {
    try {
        const query = {};
        if (req.query.patient) query.patient = req.query.patient;
        if (req.query.category) query.category = req.query.category;
        
        const records = await MedicalRecord.find(query).sort('-date');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addRecord = async (req, res) => {
    try {
        const record = new MedicalRecord(req.body);
        const saved = await record.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
