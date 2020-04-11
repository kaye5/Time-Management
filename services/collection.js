const collectionDB = require("../database/collection");
const Participant = require('./participant')
const mongoose = require('mongoose')
class Collection{
    constructor(){
    }
    createCollection(data,userid){
        try{
            data.user = mongoose.Types.ObjectId(userid);
            collectionDB.create(data,(err,res)=>{
                if(err)
                    throw err;
                let participant = new Participant();
                participant.addParticipant(data.user,res._id);
            })
            return true
        } catch(err){
            console.log(err)
            return false
        }
    }
    getCollection(userid){
        try {
            let collection = collectionDB.find({user : mongoose.Types.ObjectId(userid)})
            return collection;
        }catch(err){
            console.log(err)
            return false
        }
    }
    updateCollection(collectionID,data){
        try{
            let _id = mongoose.Types.ObjectId(collectionID)
            return collectionDB.findOneAndUpdate({_id},{$set : data})
        }catch(err){
            console.log(err);
            return false
        }
    }
    async validatePin(collectionID,pin){
        try{
            if(await collectionDB.countDocuments({_id : collectionID,pin})!=0)
                return true
            else 
                return false
        }catch(err){
            console.log(err)
            return false
        }
    }
}
module.exports = Collection
