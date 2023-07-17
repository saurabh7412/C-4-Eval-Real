const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

const userRoute = require('./Routes/userRoutes');

const postRoute = require('./Routes/postRoutes');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRoute)

app.use('/posts', postRoute)

app.get('/',(req,res)=>{

    res.status(200).send('Welcome to homepage !')
})



app.listen(process.env.PORT , ()=>{
    connect();

    console.log('listening to port 6000...');
})


const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('connected to db ...');
    } catch (error) {
        console.log(error);
    }
}