const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

const router = express.Router();

router.post('/register', async (req, res) =>{
    const {email} = req.body;

    try {
        if (await User.findOne({email}))
        return res.status(400).send({ error: 'Email já existe'});

        const user = await User.create(req.body);

        user.pass= undefined;

        return res.send({user});
    }catch (err){
        console.log(err);
        return res.status(400).send({ error: 'Registration faied!!'});
        
    }
});

router.post('/auth', async (req, res) =>{
    const { email, pass} = req.body;

    const user = await User.findOne({ email }).select('+pass');

    user.pass = undefined;
    res.sendStatus({ user });
    if (!user)
        return res.status(400).send({error: 'user not found'});
    
        
    if (!await bcrypt.compare(pass, user.pass));
    return res.status(400).send({error: 'pass invalido'});

    
});

module.exports = app => app.use('/vai', router);