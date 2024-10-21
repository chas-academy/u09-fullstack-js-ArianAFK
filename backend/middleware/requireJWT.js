const jwt = require('jsonwebtoken');

const requireJWT = (req, res, next) => {
    // Get token from headers
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireJWT;
