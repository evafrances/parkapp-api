const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true, 
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    // required: [true, 'Password required'],
    minlength: 3
  }, 
  name:{
    type:String,
    // required: [true, 'Your name'],
    default: 'josue',
    minlength: 3
  }, 
  surname: {
    type:String,
    // required: [true, 'Your surname'],
    default: '',
  }, 
  // phone: {
  //   type: Number
  // }, 
  address: {
    type: String,
    // required: [true, 'Your address'],
    default: 'burgos',
  },
  country: String,
  city: {
    type: String,
    // required: [true, 'The city where you live'],
    default: 'burgos',
  },
  CP: {
    type: Number,
  },
  cardNumber: {
    type: Number,
  },
  //! Preguntar a Carlos. 
  //! Porqué aveces pone Schema.Types y otras no
  cars: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cars',
    // required: true
  },
  favParkings: [{ 
    name: {
      type: String,
      default: ''
    },
    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parking',
      // required: true
    }
  }]
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

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) { 
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(error => next(error))
  }
});

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
  options: { sort: { createAt: -1 } }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;
