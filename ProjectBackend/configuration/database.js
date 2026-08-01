const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = ()=>{
    mongoose.connect(process.env.db_url)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log("Error occurred in database connection");
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbconnect;