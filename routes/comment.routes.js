const express = require('express');
const router = express.Router({ mergeParams: true });
const existsParking = require('../middlewares/exitstsParking.mid');
const comments = require('../controllers/comments.controller');

router.post('/comments', existsParking.existsParking, comments.create);
router.delete('/comments/:id', existsParking.existsParking, comments.delete);

module.exports = router;