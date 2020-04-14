const User = require('../services/user');
exports.viewProfile = async(req,res,next)=>{
    res.send(req.user);
}
exports.createAccount = async(req,res,next)=>{
    let user = new User()
    if(await user.createAccount(req.body))
        res.sendStatus(200)
    else 
        res.sendStatus(500)
}
exports.login = async(req,res,next)=>{
    let user = new User();
    let token = user.Login(req.user);
    res.send(token);
}
exports.logout = async(req,res,next)=>{
    req.logout();
}