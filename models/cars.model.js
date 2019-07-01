const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carModel: {
      type: String,
      required: [true, 'we need the model'],
    },
    enrollment: {
      type: String,
      required: [true, 'we need a enrollment']
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


const Cars = mongoose.model('Cars', carSchema);
module.exports = Cars;
