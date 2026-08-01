const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryconnect = ()=>{
    try{
        cloudinary.config({
            cloud_name: process.env.cloud_Name,
            api_key: process.env.api_Key,
            api_secret: process.env.api_Secret
        });
        console.log("cloudinary connected successfully")
    }
    catch(err){
        console.log("Error occurred in cloudinary connection")
    }
}