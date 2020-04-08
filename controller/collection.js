const Collection = require('../services/collection')

exports.viewCollection = async(req,res,next)=>{
    let collection = new Collection();
    res.send(await collection.getCollection("5e8de8f5d5e57413d829bb5f"));
}

exports.createCollection = async(req,res,next)=>{
    let collection = new Collection();
    let data = await collection.createCollection(req.body,"5e8de8f5d5e57413d829bb5f");
    res.sendStatus(data);
}

exports.updateCollection = async(req,res,next)=>{
    let collection = new Collection();
    collection = await collection.updateCollection(req.body.collectionID,req.body.data);
    console.log(collection);
    if(!collection){
        res.sendStatus(500);
        return -1
    }
    res.sendStatus(200);
}

exports.joinCollection = async(req,res,next)=>{

}

exports.viewParticipant = async(req,res,next)=>{
    
}

exports.editParticipant = async(req,res,next)=>{
    
}
exports.addParticipant = async(req,res,next)=>{
    
}