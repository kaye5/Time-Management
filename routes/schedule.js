//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/schedule')
const {requireAuth,requireLogin} = require('../config/user');
router.get('/view',controller.viewSchedule);;
router.post('/create',controller.createSchedule);
router.put('/update',controller.updateSchedule);

module.exports = router; 
