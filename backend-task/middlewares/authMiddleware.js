const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(decoded.id); // Fetch the user from the database

        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Authentication failed.", error: error.message });
    }
};

module.exports = { authenticateUser };
