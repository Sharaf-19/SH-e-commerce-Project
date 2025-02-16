// const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Invalid email or password');

    // const validPassword = await compare(req.body.password, user.password)
    // if(!validPassword) return res.status(400).send('Invalid email or password');
   
    const token = user.generateAuthToken();    
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 604800000
    })
    res.json({token, user});
});


function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;