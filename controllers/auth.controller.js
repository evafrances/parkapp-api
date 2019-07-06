const User = require('../models/user.model');
const createError = require('http-errors');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        throw createError(409, 'Email already registered')
      } else {
        return new User(req.body).save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, message));
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next);
}

module.exports.update = (req, res, next) => {
  delete req.body.email; //never update the mail. 
  const user = req.user;
  Object.assign(user, req.body); //<-- 
  user.save()
    .then(user => res.status(200).json(user))
    .catch(error => {
      next(error);
    });
}

//guarda la info que el usuario tiene en su app
module.exports.profile = (req, res, next) => {
  res.json(req.user);
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}
