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

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sync User from Firebase into MongoDB
exports.syncUser = async (req, res) => {
    try {
        const { uid, email } = req.user;
        const { name, role, specialty, profilePic, height, weight, bloodType, allergies } = req.body;

        // 1. Try find by Firebase UID (returning user)
        let user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            // 2. Maybe partial account exists — find by email
            user = await User.findOne({ email: email });

            if (user) {
                // Link Firebase UID and update all provided signup fields
                user.firebaseUid = uid;
                if (name) user.name = name;
                if (role) user.role = role;
                if (specialty) user.specialty = specialty;
                if (profilePic) user.profilePic = profilePic;
                if (bloodType) user.bloodType = bloodType;
                if (allergies && allergies.length) user.allergies = allergies;
                if (height) user.height = Number(height);
                if (weight) user.weight = Number(weight);
                await user.save();
            } else {
                // 3. Brand new user — create full record
                const userDataToSave = {
                    firebaseUid: uid,
                    name: name || req.user.name || 'New User',
                    email: email,
                    role: role || 'patient',
                    specialty: specialty,
                    profilePic: profilePic,
                    bloodType: bloodType,
                    allergies: allergies
                };
                if (height) userDataToSave.height = Number(height);
                if (weight) userDataToSave.weight = Number(weight);

                user = new User(userDataToSave);
                await user.save();
            }
        }

        res.status(200).json({ 
            id: user._id, 
            name: user.name, 
            role: user.role,
            profilePic: user.profilePic,
            message: 'Synced successfully' 
        });
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

exports.updateUser = async (req, res) => {
    try {
        const { height, weight, bloodType, allergies, name, profilePic } = req.body;
        const updateData = {};
        if (height) updateData.height = Number(height);
        if (weight) updateData.weight = Number(weight);
        if (bloodType !== undefined) updateData.bloodType = bloodType;
        if (allergies !== undefined) updateData.allergies = allergies;
        if (name !== undefined) updateData.name = name;
        if (profilePic !== undefined) updateData.profilePic = profilePic;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        ).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
