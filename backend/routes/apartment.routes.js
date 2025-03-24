'use strict'

const express = require('express');
const router = express.Router();
const ApartmentControllers = require('../controllers/apartment.controllers');

router.get('/' , ApartmentControllers.getAllApartments);

router
.route('/:id')
    .get(ApartmentControllers.findApartmentbyId)
    .delete(ApartmentControllers.deleteApartment)
    .put(ApartmentControllers.updateApartmentbyId)
router.post('/create-apartment', ApartmentControllers.createApartment);

module.exports = router;