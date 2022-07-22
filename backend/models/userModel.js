const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    gender: {
        type: String,
        default: 'Prefer not to say',
        enum: ['Prefer not to say', 'Male', 'Female']
    },
    matriculationYear: {
        type: Number,
        default: 0
    },
    major: {
        type: String,
        default: "No Major Specified"
    },
    about: {
        type: String,
        default: "No information added yet."

    },
    profileImage: {
        type: String,
        default: 'https://res.cloudinary.com/dqreeripf/image/upload/v1656242180/xdqcnyg5zu0y9iijznvf.jpg'
    },
    cloudinaryId: {
        type: String,
        default: ''
    },
    planner: {
        type: Array,
        default: [],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    banned : {
        type: Boolean,
        default: false,
    },
    moderator: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)