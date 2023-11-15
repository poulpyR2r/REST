const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Middleware function to verify if user is an admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
};

// Middleware function to verify if user is a regular user
const verifyUser = (req, res, next) => {
    if (req.user.role === 'user') {
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyUser
};
