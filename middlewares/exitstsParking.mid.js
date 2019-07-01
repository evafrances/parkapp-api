const createError = require('http-errors');
const Parking = require('../models/parking.model');

module.exports.existsParking = (req, res, next) => {
  Parking.findById(req.params.parkingId)
    .then(parking => {
      if (!parking) {
        throw createError(404, 'Parking not found')
      } else {
        next();
      }
    })
    .catch(next)
}