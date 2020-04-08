const mongoose = require("mongoose")

const participantSchema = new mongoose.Schema({
    _id : String,
    collection : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'collection'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})



module.exports = mongoose.model("participant",participantSchema)