const Parking = require('../models/parking.model');
const User = require('../models/user.model');
const createError = require('http-errors');
const axios = require('axios')

module.exports.list = (req, res, next) => {
  Parking.find()
    .then(parkings => res.json(parkings))
    .catch(next)
}

module.exports.get = (req, res, next) => { // retorna un solo parking
  console.log(req.params.parkingId)
  Parking.findById(req.params.parkingId)
    .then(parking => {
      if (!parking) {
        throw createError(504, 'Parking not found!')
      } else {        
        console.log(req.user) //req.user is not defined. 
        // parking.isFavorite = req.user.favParkings.some(el => el === req.params.parkingId)
        // console.log(parking.isFavorite)
        res.json(parking)
      }
    })
    .catch(next)
}

//All the parking that the user have
module.exports.listFavs = (req, res, next) => {
  User.findById(req.user.id)
  //con el 'populate', lo estamos relacionando en user models, para relacionar los que ha marcado como favs
    .populate('favParkings.parking')
    .then(user => res.json(user.favParkings))
    .catch(next)
}

module.exports.addToFavs = (req, res, next) => {
  const existe = req.user.favParkings.some((el, i) => el.parking.toString() == req.params.parkingId)

  if(!existe){
    req.user.favParkings.push({
      parking: req.params.parkingId
    })
  } else{
    throw createError(400, 'It is in the list!')
  }

  req.user.save()
    .then(() => res.status(204).json())
    .catch(next)
}

//Update that parking like you want
module.exports.updateFavParking = (req, res, next) => {
  const favParking = req.user.favParkings.find(fav => fav.parking.toString() === req.params.parkingId)
  favParking.name = req.body.name

  req.user.save()
    .then(() => res.json())
    .catch(next)
}

//Delete that parking
module.exports.parkingDelete = (req, res, next) => {
  // TODO: borrarlo del array de favs
  Parking.findByIdAndDelete(req.params.parkingId)
    .then(parking => {
      if (!parking) {
        throw createError(404, 'Parking not found')
      } else {
        res.status(204).json(parking);
      }
    })
    .catch(next)
}