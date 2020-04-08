const collectionDB = require("../database/collection");
const mongoose = require('mongoose')
class Collection{
    constructor(){
    }
    createCollection(data,userid){
        try{
            data.user = mongoose.Types.ObjectId(userid);
            return collectionDB.create(data)
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
}
module.exports = Collection