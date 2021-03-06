const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/list', async (req, res) => {
    
    try{
        return res.send(await User.find());

    } catch(err){
        return res.status(400).send({error: 'Load users failed'});
    }
});

router.post('/register', async (req, res) => {
    const { name, email } = req.body;
    try{
        if(await User.findOne({ email }))
            return res.status(400).send({error: 'User already exists'});

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user });

    } catch(err){
        return res.status(400).send({error: 'Registration failed'});
    }
});

module.exports = (app) => app.use('/user', router);