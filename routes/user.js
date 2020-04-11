//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/user')
const {requireAuth,requireLogin} = require('../config/user');
router.get('/profile',requireAuth,controller.viewProfile)
router.post('/login',requireLogin,controller.login)
router.post('/logout',requireAuth,controller.logout)


module.exports = router; 
