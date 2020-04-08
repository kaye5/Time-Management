//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/user')
const {requireAuth,requireLogin} = require('../config/user');
router.get('/view',controller.viewProfile)
router.post('/login',controller.login)


module.exports = router; 
