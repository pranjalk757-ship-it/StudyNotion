const USER = require("../models/user");
const {mailsender} = require('../utils/mailsender');
const bcrypt = require('bcrypt')
exports.resetPasswordToken = async(req,res)=>{
    try{
        const {email} = req.body;

        const user = await USER.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"email is not registered"
            })
        }

        const token = crypto.randomUUID();

        const userUpdate = await USER.findOneAndUpdate({email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpire:Date.now() + 5*60*1000
                                                        },
                                                        {new:true}
                                                    )
        const url = `http://localhost:3000/update-password/${token}`;
        await mailsender(email,"Password Reset link ",`Password Reset Link ${url}`)

        return res.status(200).json({
            success:true,
            message:"Password Reset Link sent successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(200).json({
            success:false,
            message:"Error occurred in Password reset link"
        })
    }
}


exports.resetPassword = async(req,res)=>{
    try{
        console.log("req body mein ",req.body)
        const {password,confirmPassword,token} = req.body;

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password and Confirm_Password not match"
            })
        }

        const user = await USER.findOne({token});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid Token"
            })
        }

        if(user.resetPasswordExpire < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token expired ,Regenerate it"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        const userupdate = await USER.findOneAndUpdate({token:token},
                                                        {
                                                            password:hashPassword,
                                                        },
                                                        {new:true}
                                                    )

        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occurred in Password Reset"
        })
    }
}