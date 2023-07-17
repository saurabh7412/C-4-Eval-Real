
const express = require('express');

const router = express.Router();

const users = require('../Models/userModel');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

router.get('/',(req,res)=>{

    res.status(200).send('Welcome to users route !')
})


router.post('/register', async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userCheck = await users.findOne({email});

        if(userCheck){
           return res.status(400).send('User Already Exist !')
        }

        const newpass = await bcrypt.hash(password, 10);

        const newUser = await users.create({...req.body, password : newpass})

        res.status(200).send({msg: "New User Registered" ,newUser})


    } catch (error) {
        res.status(500).send(error)
    }
})



router.post('/login', async(req,res)=>{
    try {
        const {email,password} = req.body;

        const userCheck = await users.findOne({email});

        if(!userCheck){
           return res.status(400).send('User Not Found !')
        }


        const verify = await bcrypt.compare(password, userCheck.password);


        if(!verify){
            return res.status(400).send('Wrong password !')
        }

        const token = jwt.sign({userID : userCheck._id, email : userCheck.email} , '123', {expiresIn : "5d"});

        res.status(200).send({msg: "Login Successful" ,token});

        


    } catch (error) {
        res.status(500).send(error)
    }
})












module.exports = router;