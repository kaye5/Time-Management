//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/collection')
const {requireAuth,requireLogin} = require('../config/admin');

router.get('/view',controller.viewCollection);
router.post('/create',controller.createCollection);
router.put('/update',controller.updateCollection);

router.get('/participant/view',controller.viewParticipant);
router.put('/participant/update',controller.editParticipant);
router.put('/participant/join',controller.joinCollection);
router.put('/participant/add',controller.addParticipant);

module.exports = router; 
