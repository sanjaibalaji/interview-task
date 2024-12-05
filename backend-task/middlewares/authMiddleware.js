const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {


    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            
            return res.status(401).json({ message: "Authentication token is missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        
        return res.status(401).json({ message: "Authentication failed.", error: error.message });
    }
};


module.exports = { authenticateUser };
