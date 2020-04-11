const jwt = require('jsonwebtoken')
const userDB = require('../database/user')
class User {
    constructor(){}
    /**
     * 
     * @param {JSON} data 
     */
    createAccount(data){

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