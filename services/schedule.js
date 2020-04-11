const scheduleDB = require('../database/schedule')
const moment = require('moment-timezone')
const mongoose = require('mongoose')
const scheduleStat = ['waiting','on going','completed','overdue']

const cron = require('node-schedule');

class Schedule{
    constructor(){}
    /**
     * 
     * @param {Mongoose ObjectID} collectionID
     */
    getSchedule(collectionID){
        return scheduleDB.find({collections : mongoose.Types.ObjectId(collectionID)})
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
            await createSchedule(id,scheduleStat[1],startDate,deadline);
            setStatus(id,scheduleStat[1])
        }
        else if(moment(moment.now()).isAfter(deadline)){
            console.log('deadline')
            setStatus(id,scheduleStat[3])
        } 
        else if(moment(moment.now()).isBefore(startDate)){
            console.log('waiting')
            await createSchedule(id,scheduleStat[0],startDate,deadline);
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
function createSchedule(shceduleID,status,startDate,deadline){
    if(status == scheduleStat[2])
        return -1
    else if (status == scheduleStat[0]){
        var date = new Date(startDate)
        cron.scheduleJob(String(shceduleID),date,res=>{
            console.log(res);
            setStatus(shceduleID,scheduleStat[1])
        })
    }
    else if (status == scheduleStat[1]){
        var date = new Date(deadline)
        cron.scheduleJob(String(shceduleID),date,res=>{
            console.log(res);
            setStatus(shceduleID,scheduleStat[3])
        })
    }
}
module.exports = Schedule