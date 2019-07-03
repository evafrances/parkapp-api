const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parking.controller')
router.get('/parkings', parkingController.parkings)
router.get('/parkings/fav', parkingController.favParkings)
router.get('/parkings/fav/:id', parkingController.thisParking)
router.post('/parkings/fav/:id', parkingController.addFavParking)
router.put('/parkings/fav/:id', parkingController.parkingUpdate)
router.delete('/parkings/fav/:id', parkingController.parkingDelete)

module.exports = router;
