const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true],
    },
    address: {
      type: String,
      required: [true, 'Your address']
    },
    price: {
        type: Number,
        required: [true]
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
        return ret;
      }
    },
  });


const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;