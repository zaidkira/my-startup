const admin = require('../config/firebase');

const verifyFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No Token Provided' });
        }

        const idToken = authHeader.split('Bearer ')[1];
        
        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        // Attach user specific info to request
        req.user = decodedToken; // contains .uid, .email, etc.
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Token', error: error.message });
    }
};

module.exports = verifyFirebaseToken;
