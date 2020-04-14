const mongoose = require("mongoose")

scheduleSchema = new mongoose.Schema({
    id : String,
    collections : {
        type : mongoose.Types.ObjectId,
        ref : 'collection'
    },
    title : String,
    subtitle : String,
    startDate : Date,
    deadline : Date,
    status : String,
    description : String,
    dateCreated : {
        type : Date,
        default : Date.now
    },
})



module.exports = mongoose.model("schedule",scheduleSchema)