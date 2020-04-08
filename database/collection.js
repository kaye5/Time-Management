const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema({
    id : Number,
    name : String,
    pin : String,
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    }
})



module.exports = mongoose.model("collection",collectionSchema)