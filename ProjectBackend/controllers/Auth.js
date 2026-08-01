const USER = require('../models/user');
const OTP = require('../models/otp');
const otpgenerator = require("otp-generator")
const bcrypt = require("bcrypt");
const Profile = require('../models/Profile')
const jwt = require("jsonwebtoken");
const {mailsender} = require('../utils/mailsender')
require("dotenv").config();

exports.sendOtp = async(req,res)=>{
    try{
        // fetch email
        console.log("Printing req body ji ",req.body)
        const {email} = req.body;

        // validate email
        const checkUserPresent = await USER.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"Email not exist in database"
            })
        }

        // generate otp
        const otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            result = await OTP.findOne({otp:otp});
        };
        console.log("OTP is ",otp)
        // store otp in database
        const otppayload = {otp,email};

        const otpBody = await OTP.create(otppayload);
        console.log("OTP Body is ",otpBody)

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully in email",
            otp
        })

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Error occurred in sending OTP"
        })
    }
}


exports.signUp = async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            additionalDetails,
            image,
            otp
        }   = req.body;

        // validate
         
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !otp){
            return res.status(404).json({
                success:false,
                message:"Please fill all details carefully"
            })
        }

        // password match
        if(password != confirmPassword){
            return res.status(422).json({
                success:false,
                message:"Password and ConfirmPassword are not matching"
            })
        }

        const existingUser = await USER.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already registered , Please Login"
            })
        }

        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length === 0){
            return res.status(404).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOtp.otp){
            return res.status(401).json({
                success:true,
                message:"Invalid OTP "
            })
        }
        
        const hashPassword = await bcrypt.hash(password,10);
        
        const profileDetail = await Profile.create({
            gender:null,
            dateOfBirth:null,
            phoneNumber:null,
            about:null
        })
        const userDetail = await USER.create({
            firstName,
            lastName,
            email,
            accountType,
            password:hashPassword,
            additionalDetails:profileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success:true,
            message:"User Signed Up Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Error occurred in sign up"
        })
    }
}


exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        // validate
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }
        // check user exist or not

        const user = await USER.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not exist ,SignUp first"
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            };

            const token = jwt.sign(payload,process.env.JWT_Secret,{
                expiresIn:'2h'
            })

            user.token = token;
            user.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
        }
        else{
            return res.status(422).json({
                success:false,
                message:"Invalid Password"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login occurred ,Please try again"
        })
    }
}


exports.changePassword = async(req,res)=>{
    try{
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;

        const user = await USER.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(!await bcrypt.compare(oldPassword,user.password)){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
        if(!newPassword || !confirmNewPassword){
            return res.status(404).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        if(newPassword !== confirmNewPassword){
            return res.status(422).json({
                success:false,
                message:"New_Password and Confirm_New_Password not matched"
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10);
        const userdetail = await USER.findOneAndUpdate({email},{password:hashPassword},{new:true})

        const mailresponse = await mailsender(user.email,"Password Changed Successfully");

        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in changing password"
        })
    }
}