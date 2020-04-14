const participantDB = require('../database/participant')
const userDB = require('../database/user')
const mongoose = require('mongoose')

async function isValid(collectionID,pin){
    const Coll = require('./collection')
    let col = new Coll();
    return await col.validatePin(collectionID,pin)
}
class Participant{
    constructor(){}
    getParticipant(collectionID){
        let collections = mongoose.Types.ObjectId(collectionID);
        return participantDB.find({collections : collections}).populate('user');
    }
    async JoinCollection(userID,collectionID,pin){    
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID)
        if(await isValid(collections,pin))
            return participantDB.create({collections,user : user, _id : collections+user._id});
        else return false
    }
    async editParticipant(participantID){
        return participantDB.findOneAndDelete({_id : participantID})
    }
    async addParticipant(userID,collectionID){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = await userDB.findOne({id : userID})
        return participantDB.create({collections,user : user._id, _id : collections+user._id});
    }
    async validateParticipant(collectionID,userID){
        let collections = mongoose.Types.ObjectId(collectionID);
        let user = mongoose.Types.ObjectId(userID);
        return await participantDB.countDocuments({collections,user}) == 1;
    }
}
module.exports = Participant;