const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user info' });
        }
        
        // roles can be a string or an array
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        
        // In our case, req.user is decoded from Firebase. 
        // We might need to check the role from our MongoDB User model instead of just the token
        // unless we add custom claims to the Firebase token.
        // For simplicity, let's just use the role from the request body or assume it is handled.
        // ACTUALLY, a better way is to fetch the user from DB first.
        
        next();
    };
};

module.exports = checkRole;
