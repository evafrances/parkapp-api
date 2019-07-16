const express = require('express');
const router = express.Router();
const routerController = require('../controllers/mail.controller')
router.post('/apply', routerController.apply)

module.exports = router;