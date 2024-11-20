const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: 'Acces denied ! (no token)'})
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({error: 'Invalid token'});
    }
}

module.exports = authMiddleware;