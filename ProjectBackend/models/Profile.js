const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male","Female","other"],
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    phoneNumber:{
        type:String,
        trim:true
    }
})

module.exports = mongoose.model("Profile",profileSchema);