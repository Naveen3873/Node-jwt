const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ error: 'Access Denied!' });
    try {
        const decodeed = jwt.verify(token, process.env.SEC_KEY);
        req.userId = decodeed.userId;
        next();
    } catch(err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;