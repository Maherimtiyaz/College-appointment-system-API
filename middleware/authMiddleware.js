const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header.authorization?.split(' ')[1]; // Extract token after "Bearer "
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'}); 
        } else {
            req.user = decoded;
            next();
        };
    });

};