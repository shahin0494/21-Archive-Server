const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log("inside admin jwt middleware");

    try {
        const authHeader = req.headers.authorization;

        // Check header existence and format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        console.log("DECODED TOKEN:", decoded);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            role: decoded.role
        };

        // Allow only admin
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Authorisation failed: Admin only" });
        }

        next();

    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;