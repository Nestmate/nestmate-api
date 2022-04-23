const express = require('express');
const bcrypt = require('bcryptjs');
const genUsername = require("unique-username-generator");
const User = require('../models/User.model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {isAuthenticated} = require('../middleware/jwt.middleware');

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName , birthDate, loc ,email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "missing fields" });

        const username = await genUsername.generateFromEmail(email,3);

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "user already exists" });
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, email, firstName, birthDate, loc, lastName, password: hash });
        delete newUser.password;
        const authToken = jwt.sign({ user }, process.env.TOKEN_SECRET, { algorithm: 'HS256',expiresIn: '6h' });

        res.status(200).json({authToken});

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "missing fields" });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid login" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "incorrect password" });

        delete user.password;
        
        const authToken = jwt.sign({ user }, process.env.TOKEN_SECRET, { algorithm: 'HS256',expiresIn: '6h' });

        res.status(200).json({authToken});


    } catch (err) {

        res.status(500).json({ message: err });
    }
});

router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload);
});

module.exports = router;