const Schedule = require('../services/schedule')
exports.viewSchedule = async(req,res,next)=>{
    try {
        let schedule = new Schedule();
        res.send(await schedule.getSchedule(req.params.collectionID,req.query));
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

exports.createSchedule = async(req,res,next)=>{
    try {
        let schedule = new Schedule();
        await schedule.createSchedule(req.body.collectionID,req.body.data);
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

exports.updateSchedule = async(req,res,next)=>{
    try {
        let schedule = new Schedule();
        await schedule.editSchedule(req.body.id,req.body.data);
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

exports.deleteSchedule = async(req,res,next)=>{
    try {
        let schedule = new Schedule();
        await schedule.deleteSchedule(req.body.id)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}