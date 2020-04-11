const User = require('../services/user');
exports.viewProfile = async(req,res,next)=>{
    res.send(req.user);
}
exports.createAccount = async(req,res,next)=>{
    
}
exports.login = async(req,res,next)=>{
    let user = new User();
    let token = user.Login(req.user);
    res.send(token);
}
exports.logout = async(req,res,next)=>{
    req.logout();
}