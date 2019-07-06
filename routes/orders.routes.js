const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller')
router.get('/', ordersController.orders)
router.post('/', ordersController.keepOrders)

module.exports = router;