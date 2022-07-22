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
    images: {
      type: Array,
      default: []
    },
    comments : [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
      }
    ],
    likes : {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    dislikes : {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    pinned : {
        type: Boolean,
        default: false
    }, 
    pinnedAt : {
        type: Date,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)