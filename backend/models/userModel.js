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
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)