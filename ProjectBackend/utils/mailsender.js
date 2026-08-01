const nodemailer = require("nodemailer");

require("dotenv").config();
exports.mailsender = async(email,title,body)=>{

    try{
         let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
         })

         const info = await transporter.sendMail({
            from:"StudyNotion by Pranjal",
            to:email,
            subject:title,
            html:`${body}`
         })

         console.log(info);
         return info;
    }
    catch(err){
        console.log("Error occured in mail sender",err);
    }
}
