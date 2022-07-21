const mongoose = require('mongoose')

const requirementSchema = mongoose.Schema(
  {
    title : {
        type: String,
        required: [true, 'Please add a title']
    },
    degreeType : {
      type: String,
      required: [true, 'Please add a title']
  },
    requirements : {
      type: Array,
      default: []
    }
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Requirement', requirementSchema)