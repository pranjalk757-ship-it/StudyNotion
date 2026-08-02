const express = require("express");
const app = express();

require("dotenv").config();
const dbconnect = require('./configuration/database');
const {cloudinaryconnect} = require('./configuration/cloudinary');

const fileupload = require('express-fileupload');
const cookieparser = require('cookie-parser');
const cors = require('cors')
const course = require('./routes/course');
const payment = require('./routes/payment');
const profile = require('./routes/profile');
const user = require('./routes/user');


app.use(cookieparser());
app.use(express.json());
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://studynotion-tau-coral.vercel.app",
];

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

app.use('/api/v1/course',course);
app.use('/api/v1/payment',payment);
app.use('/api/v1/profile',profile);
app.use('/api/v1/auth',user);

dbconnect();
cloudinaryconnect();

app.get('/',(req,res)=>{
    res.send("This is home route for StudyNotion");
})

app.listen(PORT,()=>{
    console.log(`Server started successfully at Port ${PORT}`)
})