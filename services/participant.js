const participantDB = require('../database/participant')
const Collection = require('./collection')
const mongoose = require('mongoose')
class Participant{
    constructor(){}
    getParticipant(collectionID){
        let collections = mongoose.Types.ObjectId(collectionID);
        return participantDB.find({collections : collections}).populate('user');
    }
    async JoinCollection(userID,collectionID,pin){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID);

        let collection = new Collection()
        let isValid = collection.validatePin(collections,pin)        
        if(await isValid)
            return participantDB.create({collections,user, _id : collections+user});
        else 
            return false
    }
    editParticipant(userID,collectionID){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID);
        return participantDB.findOneAndDelete({_id : collections+user})
    }
    addParticipant(userID,collectionID){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID);
        return participantDB.create({collections,user, _id : collections+user});
    }
    async validateParticipant(collectionID,userID){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID);
        return await participantDB.countDocuments({collections,user}) == 1;
    }
}
module.exports = Participant;