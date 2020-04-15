const jwt = require('jsonwebtoken')
const userDB = require('../database/user')
class User {
    constructor(){}
    /**
     * 
     * @param {JSON} data 
     */
    async createAccount(data){
        try {
            let count = await userDB.countDocuments({id : data.id})
            if(count > 0 )
                return false
            return userDB.create(data)
        } catch(err){
            console.log(err)
            return false
        }        
    }
    /**
     * 
     * @param {JSON} userData 
     */
    Login(userData){
        const token = jwt.sign({user : userData},process.env.JWTSECRET);
        return token; 
    }
}
module.exports = User