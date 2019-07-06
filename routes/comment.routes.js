const express = require('express');
const router = express.Router({ mergeParams: true });
const parking = require('../middlewares/parking.mid');
const comments = require('../controllers/comments.controller');

router.post('/comments', parking.existsParking, comments.create);
router.delete('/comments/:id', parking.existsParking, comments.delete);

module.exports = router;