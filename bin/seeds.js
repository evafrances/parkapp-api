const axios = require('axios')
const mongoose = require('mongoose')
require('../configs/db.config')
const Parking = require('../models/parking.model')


const syncParkings = () => axios.get('https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json')
.then(function (response) {
    const parkingsToSave = response.data['@graph'].map(element => {

        const {
            title,
            address,
            location
        } = element;

        let parking = {
            name: title.replace('Aparcamiento público. ', '')
                .replace('Aparcamiento mixto. ', ''),
            //${} porque en el json nos viene como un objeto
            address: address['street-address'],
            location: {
                type: 'Point',
                coordinates: [location.latitude, location.longitude]
            },
            //en model lo tengo como nº, no como string
            price: 0.02 + (Math.random()),
            timetable: 0,
            places: 0
        }
        return new Parking(parking).save()
    })
    return Promise.all(parkingsToSave);
})
.then(parkings => console.info(`Successfully saved ${parkings.length} parkings`))

Promise.all([
    Parking.deleteMany(),
    syncParkings()
]).catch(error => console.error(error))
.finally(() => mongoose.disconnect());


    