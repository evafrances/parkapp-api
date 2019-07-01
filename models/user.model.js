const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: [true, 'Email required'],
    unique: true, 
    trim: true,
  },
  password: {
    type: String,
    // required: [true, 'Password required'],
    minlength: 3
  }, 
  name:{
    type:String,
    // required: [true, 'Your name'],
    default: 'Eva',
    minlength: 3
  }, 
  surname: {
    type:String,
    // required: [true, 'Your surname'],
    default: '',
  }, 
  phone: {
    type: Number,
    unique: [true], 
    // required: [true, 'Your phone number'],
    default: '1234567',
  }, 
  address: {
    type: String,
    // required: [true, 'Your address'],
    default: 'burgos',
  },
  country: {
    type: String,
  },
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
  cars: {
    type: mongoose.Types.ObjectId,
    ref: 'Cars',
    // required: true
  },
  parkings: {
    type: mongoose.Types.ObjectId,
    ref: 'Parking'
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

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;
