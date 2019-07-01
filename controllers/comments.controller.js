const createError = require('http-errors');
const Comment = require('../models/comment.model');

module.exports.create = (req, res, next) => {
  const comment = new Comment({
    text: req.body.text,
    parking: req.params.parkingId
  });
  comment.save()
    .then(() => res.status(201).json(comment))
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(comment => {
      if (!comment) {
        throw createError(404, 'Comment not found')
      } else {
        res.status(204).json();
      }
    })
    .catch(next)
}