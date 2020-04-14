const jwt = require('jsonwebtoken')
const userDB = require('../database/user')
class User {
    constructor(){}
    /**
     * 
     * @param {JSON} data 
     */
    createAccount(data){
        try {
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