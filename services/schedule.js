const scheduleDB = require('../database/schedule')
const moment = require('moment-timezone').tz.setDefault('Asia/Jakarta')
const mongoose = require('mongoose')
const scheduleStat = ['waiting','on going','completed','overdue']

const nodeSchedule = require('node-schedule');

class Schedule{
    constructor(){}
    /**
     * 
     * @param {Mongoose ObjectID} collectionID
     */
    getSchedule(collectionID,query){        
        return scheduleDB.find({collections : mongoose.Types.ObjectId(collectionID),
            $and : [
                {status : {$regex : query.status}},
                {status : {$ne : query.hide}}
            ]
        }).sort(query.startDate ? {startDate : query.startDate} : {deadline : query.deadline})
    }
    /**
     * 
     * @param {JSON} data 
     */
    async createSchedule(collectionID,data){
        try{
            data.collections = mongoose.Types.ObjectId(collectionID);
            scheduleDB.create(data,(err,res)=>{
                if(err)
                    throw err;
                
                this.checkTime(res._id);
            })
            return true
        } catch(err){
            console.log(err)
            return false
        }
    }
    /**
     * 
     * @param {Mongoose ObjectID} id 
     * @param {JSON} data 
     */
    editSchedule(id,data){
        try {
            scheduleDB.findOneAndUpdate({_id : id},{$set : data},(err,res)=>{
                if(err)
                    throw err
                if(data.status == 'completed'){
                    if(nodeSchedule.scheduledJobs[res._id]){                        
                        nodeSchedule.scheduledJobs[res._id].cancel()                        
                    }
                        
                    return -1
                }                    
                this.checkTime(res._id);
            });            
            return true
        } catch(err){
            console.log(err)
            return false
        }        
    }
    deleteSchedule(id){
        return scheduleDB.findOneAndDelete({_id : mongoose.Types.ObjectId(id)});
    }
    /**
     * 
     * @param {Mongoose ObjectID} id 
     */
    async checkTime(id){
        let schedule =  await scheduleDB.findById(id);
        let startDate = schedule.startDate
        let deadline = schedule.deadline
        if( moment(moment.now()).isAfter(startDate) && moment(moment.now()).isBefore(deadline) ){
            console.log('on going')
            await setTimer(id,scheduleStat[1],startDate,deadline);
            setStatus(id,scheduleStat[1])
        }
        else if(moment(moment.now()).isAfter(deadline)){
            console.log('deadline')
            setStatus(id,scheduleStat[3])
        } 
        else if(moment(moment.now()).isBefore(startDate)){
            console.log('waiting')
            await setTimer(id,scheduleStat[0],startDate,deadline);
            setStatus(id,scheduleStat[0])
        }
    }
    
}
async function setStatus(id,status) {
    try{
        return await  scheduleDB.findOneAndUpdate({_id : id},{$set : {status}});
    }catch(err){
        console.log(err)
        return false
    }
}
function setTimer(shceduleID,status,startDate,deadline){
    if(status == scheduleStat[2])
        return -1
    else if (status == scheduleStat[0]){
        var date = new Date(startDate)
        nodeSchedule.scheduleJob(String(shceduleID),date,res=>{
            console.log(res);
            setStatus(shceduleID,scheduleStat[1])
        })
    }
    else if (status == scheduleStat[1]){
        var date = new Date(deadline)
        nodeSchedule.scheduleJob(String(shceduleID),date,res=>{
            console.log(res);
            setStatus(shceduleID,scheduleStat[3])
        })
    }
}
module.exports = Schedule