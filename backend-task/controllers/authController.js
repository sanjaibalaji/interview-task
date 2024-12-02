const User = require("../models/User");
const generateToken = require("../utils/Token");
const {registerSchema,loginSchema} = require("../validators/userValidation")


exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const { error } = registerSchema.validate({ name, email, password, role });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
      
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

    
        const user = await User.create({
            name,
            email,
            password,
            role,
        });

    
        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({ user, token });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;


    const { error } = loginSchema.validate({ email, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
   
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const token = generateToken(user._id);

        res.json({ message:"login successfull",user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



