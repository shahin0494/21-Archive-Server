const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log("inside jwt");
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json("No token provided");
        }
        const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
        console.log(decoded);
        req.user = { id: decoded.id, email: decoded.email,  username: decoded.username };
        req.role = decoded.role
        next();
    } catch (error) {
        res.status(500).json("Invalid token");
        console.log(error);
    }
};

module.exports = auth