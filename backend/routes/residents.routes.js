'use strict'

const express = require('express')
const router = express.Router()

const ResidentsControllers = require('../controllers/residents.controllers');

router.get('/',ResidentsControllers.getAllResidents);
router
    .route('/:id')
    .get(ResidentsControllers.findResidentById)
    .put(ResidentsControllers.updateResident)
    .delete(ResidentsControllers.deleteResidentById)
router.post('/create-residents',ResidentsControllers.createResident);

module.exports = router;