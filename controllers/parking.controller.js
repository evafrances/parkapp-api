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
  // TODO: eliminar duplicados   
// * 1) buscar si el parking ya existe
console.log(req.params.parkingId)
const existe = req.user.favParkings.some((el, i) => {
  
  return el.parking == req.params.parkingId
})
console.log(req.user.favParkings)
  if(!existe){
    // * 3) si no existe, le hacemos el push
    console.log('No existe')
    req.user.favParkings.push({
      parking: req.params.parkingId
    })
  } else{
    console.log('Ya existe')
    // * 2) si ya existe, return status 500 (no se puede añadir)
    throw createError(500, 'It is in the list!')
  }

  req.user.save()
    .then(user => res.status(204).json())
    .catch(next)
}

//Update that parking like you want
module.exports.updateFavParking = (req, res, next) => {
  console.log('eva')
  User.findById(req.user.id)
    .then(user => {
      console.log(user)
      const parking = us
      er.favParkings.find(fav => fav.parking == req.params.parkingId)
      parking.name = req.body.name;
      return user.save()
    })
    .then(user => res.status(204).json())
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