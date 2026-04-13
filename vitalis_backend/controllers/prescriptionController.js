const Prescription = require('../models/Prescription');

// Doctor creates a prescription
exports.createPrescription = async (req, res) => {
    try {
        const { patient, doctor, items, notes } = req.body;
        const newPrescription = new Prescription({
            patient,
            doctor,
            items,
            notes
        });
        const saved = await newPrescription.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Pharmacist or Patient gets prescriptions
exports.getPrescriptions = async (req, res) => {
    try {
        const query = {};
        if (req.query.patient) query.patient = req.query.patient;
        
        const prescs = await Prescription.find(query)
            .populate('patient', 'name')
            .populate('doctor', 'name specialty');
            
        res.status(200).json(prescs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pharmacist updates status (e.g. dispensed)
exports.updatePrescriptionStatus = async (req, res) => {
    try {
        const p = await Prescription.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.status(200).json(p);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
