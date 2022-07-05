// The user controller controls and accesses the data
const cloudinary = require('../utils/cloudinary')

// We import the jsonwebtoken package to share security information between two parties — a client and a server in this case for login authentication purposes
const jwt = require('jsonwebtoken')

// We use bcrypt to safely store passwords by hashing
const bcrypt = require('bcryptjs')

// async handler is imported to handle exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler')

const nodemailer = require('nodemailer')

const randomToken = require('random-token');

// The user model which manages the name email password data of clients
const User = require('../models/userModel')

const Token = require('../models/tokenModel')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'plannusreporting@gmail.com',
        pass: 'ifiytmienthpkotj'
    }
})


// @desc  Register User 
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const arr = ['gmail', 'outlook', 'yahoo']
    let state = false
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    } 

    const contains = arr.some(element => {
        if (email.includes(element)) {
            state = true;
        } 
    })

    if (!state) {
        res.status(400)
        throw new Error('Please sign up using either Gmail, Outlook or Yahoo')
    }
    

    // Check if user exists

    const userEmailExists = await User.findOne({email})
    const userNameExists = await User.findOne({name})

    if(userEmailExists) {
        res.status(400)
        throw new Error('Email already registered')
    } 

    if(userNameExists) {
        res.status(400)
        throw new Error('Username Taken')
    }

    // Hashing password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const user = await User.create({
        name,
        email, 
        password: hashedPassword
    })

    if(user) {
        const response = {
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            about: user.about,
            profileImage: user.profileImage,
            major: user.major,
            matriculationYear: user.matriculationYear,
            token: generateToken(user._id)
        }
        res.status(201).json(response)
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc  Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({name: username})

    if(user && (await bcrypt.compare(password, user.password))) {
        const response = {
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            about: user.about,
            profileImage: user.profileImage,
            major: user.major,
            matriculationYear: user.matriculationYear,
            token: generateToken(user._id)
        }
        res.status(201).json(response)
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc  Sending Password Reset Email
// @route GET /api/users
// @access Public
const resetEmail = asyncHandler(async (req, res) => {
    const email = req.query.email
    const user = await User.findOne({email})

    const errorHandling  = (error, info) => {
        if (error) {
            res.status(400)
            throw new Error(`${info}`)
        } else {
            res.status(200).json({
                message: 'An email containing your reset token has been sent. Please check your inbox including your spam folder.',
                email: email
            })
        }
    }

    if (user) {
        const token = randomToken(10)

        const mailOptions = {
            from: 'plannusreporting@gmail.com',
            to: user.email,
            subject: 'PlanNUS Password Reset',
            text: `Your reset token for account name: ${user.name} is ${token}.`
        }

        Token.create({token, email})

        transporter.sendMail(mailOptions, errorHandling)
    } else {
        res.status(400)
        throw new Error('Email does not exist in our database')
    }
})

// @desc  Resetting password
// @route PUT /api/users
// @access Public

const resetPassword = asyncHandler(async (req, res) => {
    const {token, password} = req.body
    const valid = await Token.findOne({token})

    if (valid) {
        if (password) {
            await Token.deleteOne({token})
            const salt = await bcrypt.genSalt(10)
            const newPass = await bcrypt.hash(password, salt)
            const email = valid.email
            const user = await User.findOne({email})
            await User.updateOne({email: email}, {$set:{password: newPass}})
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                about: user.about,
                profileImage: user.profileImage,
                major: user.major,
                matriculationYear: user.matriculationYear,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Please fill in your new password')
        }
    } else {
        res.status(400)
        throw new Error("Invalid token")
    }
})



// @desc  Get User data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// @desc  Update User Details
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    let user;
    if (req.file_error) {
        res.status(400)
        throw new Error(req.file_error)
    }
    

    if (req.file) {
        
        console.log("changing image")
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            user = await User.findByIdAndUpdate(req.body.userId, {profileImage: result.secure_url, cloudinaryId: result.public_id }, {new: true})
        } catch(err) {
            res.status(400);
            throw new Error(err.message);
        }

    } if (req.body.email) {
        console.log("changing email")
        const userEmailExists = await User.findOne({email: req.body.email});
        if (userEmailExists) {
            res.status(400);
            throw new Error("Email already registered")
        } else {
            user = await User.findByIdAndUpdate(req.body.userId, {email: req.body.email}, {new: true})

        }
        
    } if (req.body.password) {
        console.log("changing password")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user = await User.findByIdAndUpdate(req.body.userId, {password: hashedPassword}, {new: true})

    } if (req.body.gender) {
        console.log("changing gender")
        user = await User.findByIdAndUpdate(req.body.userId, {gender: req.body.gender}, {new: true})

    } if (req.body.about) {
        console.log("changing about")
        user = await User.findByIdAndUpdate(req.body.userId, {about: req.body.about}, {new: true})

    } if (req.body.major) {
        console.log("changing major")
        user = await User.findByIdAndUpdate(req.body.userId, {major: req.body.major}, {new: true})

    } if (req.body.matriculationYear) {
        console.log("changing matyear")
        user = await User.findByIdAndUpdate(req.body.userId, {matriculationYear: req.body.matriculationYear}, {new: true})

    } 

    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            about: user.about,
            profileImage: user.profileImage,
            major: user.major,
            matriculationYear: user.matriculationYear,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("No changes specified")
    }
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, 
    loginUser, 
    getMe,
    resetEmail,
    resetPassword,
    updateUser
}