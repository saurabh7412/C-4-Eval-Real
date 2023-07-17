
const express = require('express');

const router = express.Router();

const posts = require('../Models/postModel');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const Auth = require('../Middlewares/Auth');
const users = require('../Models/userModel');

router.get('/',Auth, async(req,res)=>{

    try {
        const {uniID} = req.body;

        const {device, device1, device2} = req.query;
        let filter = {};

        if(device){
            filter.device = {$regex : device, $options : "i"}
        }

        if(device1){
            filter.device = {$regex : device1, $options : "i"}
        }

        if(device2){
            filter.device = {$regex : device2, $options : "i"}
        }

        const checkPosts = await posts.find(filter)

        return res.status(200).send({checkPosts});


    } catch (error) {
        res.status(500).send(error)
    }

})


router.post('/add',Auth, async(req,res)=>{
    try {

        const { uniID, title, body, device } = req.body;

        const newpost = await  posts.create({title,body,device});

        const user = await users.findById(uniID);

        if(!user){
            return res.status(400).send('Login first !')
        }
        else{
            user.post.push(newpost._id);

            await user.save();
        }


         res.status(200).send({msg : "post added !", user : user})

        
    } catch (error) {
        res.status(500).send(error)
    }
} )





router.patch('/update/:id',Auth, async(req,res)=>{

    try {
        const {uniID, title ,body, device} = req.body;
        const {id} = req.params;


        const newData = await posts.findByIdAndUpdate(id, req.body);

        const data = await posts.findById(id);

        return res.status(200).send({msg : "Post Updated !",updated_Post : data});


    } catch (error) {
        res.status(500).send(error)
    }

    // res.status(200).send('Welcome to posts route !')
})


router.delete('/delete/:id',Auth, async(req,res)=>{

    try {
        const {uniID, title ,body, device} = req.body;
        const {id} = req.params;


        const newData = await posts.findByIdAndDelete(id, req.body);

        return res.status(200).send({msg : "Post Deleted !", deletedData : newData});


    } catch (error) {
        res.status(500).send(error)
    }

    // res.status(200).send('Welcome to posts route !')
})



module.exports = router;