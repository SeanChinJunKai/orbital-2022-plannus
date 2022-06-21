// The user controller controls and accesses the data

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
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
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
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc  Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
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

    const url = 'http://localhost:3000/reset'

    const errorHandling  = (error, info) => {
        if (error) {
            res.status(400)
            throw new Error(`${info}`)
        } else {
            res.status(200).json({
                message: 'Email Has Been Sent',
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
            text: `Please go to ${url} to reset your password. Your token is ${token}`
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
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(password, salt)
        const email = valid.email
        const user = await User.findOne({email})
        await User.updateOne({email: email}, {$set:{password: newPass}})
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
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
}