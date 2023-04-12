require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.split(" ")[1]) || req.body.token || req.query.token;
  
    if (!token) {
        res.json({ message: "Missing token" });
        res.status(401);
        res.end();
    }
  
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userEmail = decoded.email;
        const requestEmail = req.body.email || req.query.email; // Or whichever request parameter the email is passed in
    
        if (userEmail !== requestEmail) {
            res.json({ message: "Unauthorized" });
            res.status(403);
            res.end();
        }
    
        // The token is valid and belongs to the correct user
        next();
    } catch (error) {
        if (!res.writableEnded) {
            res.json({ message: "Invalid token" });
            res.status(401);
            res.end();
        }
    }
}

module.exports = verifyToken;