const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parking.controller')
const parking = require('../middlewares/parking.mid');


router.get('/', parkingController.list)
//? Devuelve todos los favoritos
router.get('/fav', parkingController.listFavs)
// Te trae un favorito en especifico
router.get('/:parkingId', parking.existsParking, parkingController.get)
router.get('/:parkingId/fav', parking.existsParking, parkingController.addToFavs)
router.put('/:parkingId/fav', parking.existsParking, parkingController.updateFavParking)
router.delete('/:parkingId/fav', parking.existsParking, parkingController.parkingDelete)

module.exports = router;
