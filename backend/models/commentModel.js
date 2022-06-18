const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: [true, 'Please add a title'],
    },
    replies : [],
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

module.exports = mongoose.model('Comment', commentSchema)