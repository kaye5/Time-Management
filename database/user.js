const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    password : String,    
    role : {
    	type : String,
    	enum : ['user','admin']
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("user",userSchema)