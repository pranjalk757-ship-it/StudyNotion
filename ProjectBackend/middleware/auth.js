const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req,res,next)=>{
    try{
        // order wrong ho raha tha kyunki authorization mein pehle se hi bearer token set tha usko no-auth kiya hai
        const token = req.header("Authorization")?.replace("Bearer ", "") 
           || req.cookies?.token 
           || req.body.token;

         if(!token){
            return res.status(404).json({
                success:true,
                message:"Token not found"
            })
         }

         try{
            const response = jwt.verify(token,process.env.JWT_Secret);
            console.log("outside");
            console.log("Response ",response)
            req.candidate = response;
         }
         catch(err){
            return res.status(422).json({
                success:false,
                message:"Invalid Token"
            })
         }
         next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:true,
            message:"Error occurred in authorisation"
        })
    }
}

exports.isStudent = async (req,res,next)=>{
    try{
        if(req.candidate.accountType !== "Student"){
            return res.status(422).json({
                success:false,
                message:"Not authorised path for Student"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in isStudent path"
        })
    }
}


exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.candidate.accountType !== "Instructor"){
            return res.status(422).json({
                success:false,
                message:"Not authorised path for Instructor"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in isInstructor path"
        })
    }
}


exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.candidate.accountType !== "Admin"){
            return res.status(422).json({
                success:false,
                message:"Not authorised path for Admin"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred in isAdmin path"
        })
    }
}