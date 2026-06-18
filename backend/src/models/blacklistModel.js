const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({

    token:{
        type : String,
        required : [true , "Please give token " ]
    }
    

} ,{ timestampts : true})


const tokenBlacklistModel = mongoose.model("blacklisttokens " , blacklistSchema)

module.exports = tokenBlacklistModel