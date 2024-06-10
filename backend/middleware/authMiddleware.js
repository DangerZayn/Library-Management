const jwt = require('jsonwebtoken');
const User = require('../models/userMod');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied: User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Something went wrong with the auth middleware:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
