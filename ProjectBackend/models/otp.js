const mongoose = require("mongoose");
const {mailsender} = require('../utils/mailsender')
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true,
        expires:5*60
    },
    otp:{
        type:String,
        required:true
    }
});


//. Function to Send Emails

async function sendverificationmail(email,otp){
    try{
        const mailresponse = await mailsender(email,"Verification Email form StudyNotion",otp);
        console.log("Email sent successfully",mailresponse);
    }
    catch(err){
        console.log("Error occur while sending  Email");
        console.error(err);
        throw err;
    }
};

otpSchema.pre("save",async function(){
    await sendverificationmail(this.email,this.otp);
})

module.exports = mongoose.model("OTP",otpSchema);