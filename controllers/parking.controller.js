const Parking = require('../models/parking.model');
const createError = require('http-errors');
const axios = require('axios')

//All the parking
module.exports.parkings = (req, res, next) => {
  axios.get('https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json')
  .then(function (response) {
    console.log(response.data['@graph']);
    const obj = JSON.stringify(response.data)
    response.data['@graph'].forEach(element => {

      const { title, location } = element;

      let parking = {
        name: title,
        //${} porque en el json nos viene como un objeto
        address: `${location}`,
        //en model lo tengo como nº, no como string
        price: 0,
        places: 0
        }

      new Parking(parking).save()
      .then(()=> console.log('everythings ok'))
      .catch((err) => console.log(err+'Fail'))
      res.json(response.data['@graph'])
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

//All the parking that the user have
module.exports.favParkings = (req, res, next) => {
  const {
    id
  } = req.user;

  User.findById(id) //* Here you are searching inside user collection
    .populate('Parking') // * To bring all the data from that model
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

module.exports.addFavParking = (req, res, next) => {

}

//Update that parking like you want
module.exports.parkingUpdate = (req, res, next) => {
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
module.exports.parkingDelete = (req, res, next) => {
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