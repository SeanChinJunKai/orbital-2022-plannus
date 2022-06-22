const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema(
  {
    moduleCode: {
      type: String,
      required: true,
    },
    moduleCredit: {
      type: Number,
      required: true,
    },
    title: {
        type: String,
        required: true,
    },
    prereqTree : {
        type: mongoose.Schema.Types.Mixed, // to be of type object, with and/or as arrays (logical operators)
        /*
            EXAMPLE TREE
            {
                "and": [
                    {
                        "or": [
                            "CS2010",
                            "CS2020",
                            {
                                "or": [
                                    "CS2030",
                                    "CS2113",
                                    "CS2113T"
                                ]
                            }
                        ]
                    },
                    "CS2040"
                ]
            }
        */
        default: {}
    },
    preclusion: [
        {
            type: String, // need to parse from string e.g. "CS1104 or Students from department of ECE" -> CS1104
            default: []
        }
    ]
  }
)

module.exports = mongoose.model('Module', moduleSchema)