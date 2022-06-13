const mongoose = require('mongoose')

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
    comments : [],
    likes : {
        type: Number,
        default: 0,
    },
    dislikes : {
        type: Number,
        default: 0,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)