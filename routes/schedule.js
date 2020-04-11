//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/schedule')
const {requireAuth} = require('../config/user');
router.get('/view/:collectionID',requireAuth,controller.viewSchedule);
router.post('/create',requireAuth,controller.createSchedule);
router.put('/update',requireAuth,controller.updateSchedule);
router.put('/delete',requireAuth,controller.deleteSchedule);

module.exports = router; 
