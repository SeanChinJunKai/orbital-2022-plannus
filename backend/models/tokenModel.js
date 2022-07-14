const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    createdAt: {type: Date, default: Date.now(), expires: 36000} // expires in 1hr
  },
)

module.exports = mongoose.model('Token', tokenSchema)