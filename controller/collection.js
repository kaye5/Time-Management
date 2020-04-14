const Collection = require('../services/collection')
const Participant = require('../services/participant')
/**
 * @description GET 
 */
exports.viewCollection = async(req,res,next)=>{
    let collection = new Collection();
    res.send(await collection.getCollection(req.user));
}
/**
 * @description POST
 */
exports.createCollection = async(req,res,next)=>{
    let collection = new Collection();
    let data = await collection.createCollection(req.body,req.user._id);
    if(data)
        res.sendStatus(200)
    else 
        res.sendStatus(500);
}
/**
 * @description PUT
 */
exports.updateCollection = async(req,res,next)=>{
    let collection = new Collection();
    collection = await collection.updateCollection(req.body.collectionID,req.body.data);
    if(!collection){
        res.sendStatus(500);
        return -1
    }
    res.sendStatus(200);
}


/**
 * @description PUT
 */
exports.deleteCollection = async(req,res,next)=>{
    let collection = new Collection();
    collection = await collection.deleteCollection(req.body.collectionID);
    if(!collection){
        res.sendStatus(500);
        return -1
    }
    res.sendStatus(200);
}

/**
 * @description PUT /participant/join
 */
exports.joinCollection = async(req,res,next)=>{
    try{
        let participant = new Participant();    
        if(await participant.JoinCollection(req.user._id,req.body.collectionID,req.body.pin))
            res.sendStatus(200)
        else 
            res.sendStatus(403)
    } catch(err){
        console.log(err)        
        res.sendStatus(500)
    }
    
}
/**
 * @description GET /participant/view
 */
exports.viewParticipant = async(req,res,next)=>{
    try {
        let participant = new Participant();
        res.send(await participant.getParticipant(req.query.collection))
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }   
}
/**
 * @description PUT /participant/update
 * delete participant
 */
exports.editParticipant = async(req,res,next)=>{
    try {
        let participant = new Participant();
        await participant.editParticipant(req.body.participantID)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

/**
 * @description PUT /participant/add
 * add participant
 */
exports.addParticipant = async(req,res,next)=>{
    try {
        let participant = new Participant();
        await participant.addParticipant(req.body.user,req.body.collectionID);
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
/**
 * @description PUT /participant/validate
 */
exports.validateParticipant = async(req,res,next)=>{
    try{
        let participant = new Participant();
        let isValid = await participant.validateParticipant(req.body.collectionID,req.user._id)
        if(isValid)
            res.sendStatus(200);
        else 
            res.sendStatus(403);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}