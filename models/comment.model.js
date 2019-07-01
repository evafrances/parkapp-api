const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required',
    min: 3,
    max: 100
  },
  parkings: {
    type: mongoose.Types.ObjectId,
    ref: 'Parking',
    required: true
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;