const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true],
    },
    address: {
      type: String,
      required: 'Your address'
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    price: {
        type: Number,
        required: true
    },
    timetable: {
        type: Number,
        required: true
    },
    places: {
        type: Number,
        required: [true]
    }
    }, {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        ret.location = ret.location.coordinates;
        return ret;
      }
    },
  });


const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;