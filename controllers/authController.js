const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email ||!password || !role) {
        return res.status(400).json({ error: "All fields are required" });

    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    }   catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login a user and return a JWT token 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expireIn: '1h' }
        );

        res.status(200).json({ message: "Login successful!", token });
    }   catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: "Server error" });
    }
}; 
