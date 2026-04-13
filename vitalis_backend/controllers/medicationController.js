const MedicationSchedule = require('../models/MedicationSchedule');

exports.getSchedules = async (req, res) => {
    try {
        const query = req.query.patient ? { patient: req.query.patient, isActive: true } : {};
        const schedules = await MedicationSchedule.find(query).sort('timeStr');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSchedule = async (req, res) => {
    try {
        const schedule = new MedicationSchedule(req.body);
        const saved = await schedule.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Log that a pill was taken today
exports.logTaken = async (req, res) => {
    try {
        const schedule = await MedicationSchedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        
        // Push current date
        schedule.takenLogs.push(new Date());
        await schedule.save();
        
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
