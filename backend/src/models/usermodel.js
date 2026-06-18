const mongoose = require("mongoose")

const userrSchema = mongoose.Schema({

    username : {
        type : String,
        unique : [true, "Already Taken"],
        required : true

    },

    email : {

        type : String ,
        unique : [true, "Enter a different email this one already exists"],
        required : true
    },

    password : {
        type : String,
        required : true
    }
})


const userModel = mongoose.model("users", userrSchema)

module.exports = userModel