'use trict'

const express = require('express')
const router = express.Router();

const FeesController = require('../controllers/fees.controllers');

router.get('/', FeesController.getAllFees);
router.post('/createFees',FeesController.createFees);
router
  .route('/:id')
      .get(FeesController.getFeesById)
      .put(FeesController.updateFees)
      .delete(FeesController.deleteFees)
    

module.exports = router;
