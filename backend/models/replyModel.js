const mongoose = require('mongoose')

const replySchema = mongoose.Schema(
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

module.exports = mongoose.model('Reply', replySchema)