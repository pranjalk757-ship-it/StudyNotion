const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    timeDuration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    videoUrl:{
        type:String,
    },
    publicId:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("SubSection",subSectionSchema);