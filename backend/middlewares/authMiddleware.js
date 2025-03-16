const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.header('Authorization');

    console.log("Received Token:", token); // Debugging

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }

    try {
        token = token.split(' ')[1]; // Extract actual token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("userId", req.user)
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = protect;
