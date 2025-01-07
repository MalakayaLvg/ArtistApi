const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();



async function register (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({ username, password: hashedPassword });
        await user.save();
        console.log(user)

        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login (req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {username,password} = req.body;

    try {
        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({error: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({error: 'Invalid credentials' });
        }

        const token = jwt.sign({id: user._id, username: user.username }, 'your_jwt_secret',{expiresIn: '1h'});

        res.status(200).json({ token });
    } catch (err) {
        res.json({error: "Internal server error"});
    }
}

module.exports = {login, register}