const axios = require('axios')
const mongoose = require('mongoose')
require('../configs/db.config')
const Parking = require('../models/parking.model')

//faker generación de datos falsos
const faker = require('faker');


const syncParkings = () => axios.get('https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json')
.then(function (response) {
    const parkingsToSave = response.data['@graph'].map(element => {

        const {
            title,
            address,
            location
        } = element;    

        let parking = {
            name: title
                .replace('Aparcamiento público. ', '')
                .replace('Aparcamiento público ', '')
                .replace('Aparcamiento mixto. ', ''),
            //${} porque en el json nos viene como un objeto
            address: address['street-address'],
            location: {
                type: 'Point',
                coordinates: [location.latitude, location.longitude]
            },
            //en model lo tengo como nº, no como string
            price: 1.20 + (Math.random()),
            timetable: 12,
            available: faker.random.boolean(),
            places: Math.floor(Math.random() * 10) + 1  ,
            image: faker.random.uuid(),
            description: faker.lorem.paragraph()
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


    