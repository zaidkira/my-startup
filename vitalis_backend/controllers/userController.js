const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const query = role ? { role } : {};
        // Do not return passwords
        const users = await User.find(query).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sync User from Firebase into MongoDB
exports.syncUser = async (req, res) => {
    try {
        // req.user is provided by the auth middleware (decoded Firebase token)
        const { uid, email } = req.user;
        const { name, role, specialty } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ firebaseUid: uid });
        
        if (!user) {
            // Register new user locally referencing Firebase UID
            user = new User({
                firebaseUid: uid,
                name: name || req.user.name || 'New User',
                email: email,
                role: role || 'patient',
                specialty: specialty
            });
            await user.save();
        }

        res.status(200).json({ id: user._id, name: user.name, role: user.role, message: 'Synced successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.setGardeMode = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'pharmacist' },
            { gardeMode: req.body.gardeMode },
            { new: true }
        ).select('-password');
        
        if (!user) return res.status(404).json({ message: 'Pharmacist not found.' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
