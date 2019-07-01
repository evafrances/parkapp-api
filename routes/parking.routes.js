const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parking.controller')
router.get('/myParkings', parkingController.allTheParkings)
router.get('/myParking/:id', parkingController.thisParking)
router.put('/myParking/:id', parkingController.thisParking)
router.delete('/myParking/:id', parkingController.delete)

module.exports = router;
