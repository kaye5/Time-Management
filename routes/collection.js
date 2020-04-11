//express 
const express = require('express');
const router = express.Router();
const controller = require('../controller/collection')
const {requireAuth} = require('../config/admin');

router.get('/view',requireAuth,controller.viewCollection);
router.post('/create',requireAuth,controller.createCollection);
router.put('/update',requireAuth,controller.updateCollection);

router.get('/participant/view',requireAuth,controller.viewParticipant);
router.put('/participant/update',requireAuth,controller.editParticipant);
router.put('/participant/join',requireAuth,controller.joinCollection);
router.put('/participant/add',requireAuth,controller.addParticipant);
router.put('/participant/validate',requireAuth,controller.validateParticipant);
module.exports = router; 
