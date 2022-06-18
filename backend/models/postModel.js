const mongoose = require('mongoose')
const User = require('../models/userModel')

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
        type: String,
        required: [true, 'Please add a description'],
    },
    comments : {
      type: [mongoose.Schema.Types.ObjectId],
      default: []
    },
    likes : {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    dislikes : {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)