const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
router.post('/register', async (req,res) => {
    try {
        console.log("Auth Regiter calling...");
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully'});
    } catch(error) {
        // console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User Login
router.post('/login', async (req,res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // Username check
        if(!user) 
            res.status(401).json({ error: 'Authentiaction failed!' });

        // Password Check
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
            res.status(401).json({ error: 'Authentiaction failed!' });
        
        // JWT Token Create
        const token = jwt.sign({ userId: user._id }, process.env.SEC_KEY, { expiresIn: '1h' });
        res.status(200).send(token);
    } catch(error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;