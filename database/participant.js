const mongoose = require("mongoose")

const participantSchema = new mongoose.Schema({
    _id : String,
    collections : {
        type: mongoose.Schema.Types.ObjectId,
        refPath : 'collection'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})



module.exports = mongoose.model("participant",participantSchema)