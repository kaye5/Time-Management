const mongoose = require("mongoose")

scheduleSchema = new mongoose.Schema({
    id : String,
    collection : {
        type : mongoose.Types.ObjectId,
        ref : 'collection'
    },
    title : String,
    subtitle : String,
    start_date : Date,
    deadline : Date,
    dateCreated : {
        type : Date,
        default : Date.now
    },
})



module.exports = mongoose.model("schedule",collectionSchema)