const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    confirmPassword:{
        type:String,
        trim:true
    },
    accountType:{
        type:String,
        required:true,
        enum:["Student","Instructor","Admin"],
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type: Boolean,
        default:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    token:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseProgress"
        }
    ],
    },
    {
        timestamps:true
    }
);


module.exports = mongoose.model("User",userSchema);