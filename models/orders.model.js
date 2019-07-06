const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
      name: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true]
    },
    parking: {
      name: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parking',
      required: [true]
    },
    price: {
        type: Number,
        required: [true]
    },
    status: {
        type: Boolean,
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


const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders;