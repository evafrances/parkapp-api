const Parking = require('../models/parking.model');
const createError = require('http-errors');

//All the parking that the user have
module.exports.allTheParkings = (req, res, next) => {
  const {
    id
  } = req.user;

  User.findById(id)
    .populate('Parking')
    .then(user => res.json(user.parkings))
    .catch(next)
}

//Bring me only that parking
module.exports.thisParking = (req, res, next) => {
  Parking.findById(req.params.id)
    .then(parking => {
      if (!parking) {
        throw createError(404, 'Parking not found')
      } else {
        res.json(parking)
      }
    })
    .catch(next)
}

//Update that parking like you want
module.exports.update = (req, res, next) => {
  Parking.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true,
      runValidators: true
    })
    .then(parking => {
      if (!parking) {
        throw createError(404, 'Parking not found')
      } else {
        res.json(parking)
      }
    })
    .catch(next)
}

//Delete that parking
module.exports.delete = (req, res, next) => {
  Parking.findByIdAndDelete(req.params.id)
    .then(parking => {
      if (!parking) {
        throw createError(404, 'Parking not found')
      } else {
        res.status(204).json(parking);
      }
    })
    .catch(next)
}