const Orders = require('../models/orders.model');
const createError = require('http-errors');

//All orders that the user have
module.exports.orders = (req, res, next) => {
    const {
      id
    } = req.user;
  
    User.findById(id) //* Here you are searching inside user collection
      .populate('Orders') // * To bring all the data from that model
      .then(user => res.json(user.orders))
      .catch(next)
  }
  
module.exports.keepOrders = (req, res, next) => {

  }