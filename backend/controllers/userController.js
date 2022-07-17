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

const UserToken = require('../models/tokenModel')

const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'plannusreporting@gmail.com',
        pass: 'ifiytmienthpkotj'
    }
})

// @desc  Verify User 
// @route GET /api/users/:id/verify/:token
// @access Public
const verifyUser = asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
        res.status(400)
        throw new Error('Invalid Link')
    }
    const token = await UserToken.findOne({
        email: user.email
    });
    if (!token) {
        res.status(400)
        throw new Error('Invalid Link')
    }
    await User.findByIdAndUpdate(user._id, {verified: true})
    await token.remove()
    const updatedUser = await User.findOne({_id: req.params.id})
    const response = {
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        about: updatedUser.about,
        profileImage: updatedUser.profileImage,
        major: updatedUser.major,
        matriculationYear: updatedUser.matriculationYear,
        planner: updatedUser.planner,
        token: generateToken(updatedUser._id),
        verified: updatedUser.verified
    }
    res.status(200).json(response)
})


// @desc  Register User 
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, url} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
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

    if (!validPassword.test(password)) {
        res.status(400)
        throw new Error('Password needs to contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
    } else {
        // Hashing password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email, 
            password: hashedPassword
        })

        const errorHandling  = (error, info) => {
            if (error) {
                res.status(400)
                throw new Error(`${info}`)
            } else {
                res.status(201).json('A verification email has been sent. Please check your inbox including your spam folder.')
            }
        }

        if(user) {
            /*
            const response = {
                _id: user.id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                about: user.about,
                profileImage: user.profileImage,
                major: user.major,
                matriculationYear: user.matriculationYear,
                planner: user.planner,
                token: generateToken(user._id)
                verified: user.verified
            } */
            const token = randomToken(10)
            const userEmail = user.email
            await UserToken.create({token: token, email: userEmail})
            const fullUrl = url.replace('register', '') + `users/${user._id}/verify/${token}`
            const mailOptions = {
                from: 'plannusreporting@gmail.com',
                to: user.email,
                subject: 'PlanNUS Email Verification',
                html: `Please click <a href = ${fullUrl}>here</a> to verify your email`
            }
            transporter.sendMail(mailOptions, errorHandling)
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

// @desc  Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password, url} = req.body
    const user = await User.findOne({name: username})

    const errorHandling  = (error, info) => {
        if (error) {
            res.status(400)
            throw new Error(`${info}`)
        } else {
            res.status(200).json('An email containing your reset token has been sent. Please check your inbox including your spam folder.')
        }
    }
    if (!user) {
        res.status(400)
        throw new Error('No such user exists in database')
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400)
        throw new Error('Incorrect Password')
    }

    if (!user.verified) {
        let token = await UserToken.findOne({email: user.email})
        if (!token) {
            const token = randomToken(10)
            await UserToken.create({token: token, email: user.email})
            const mailOptions = {
                from: 'plannusreporting@gmail.com',
                to: user.email,
                subject: 'PlanNUS Password Reset',
                html: `Please click <a href = http://localhost:3000/users/${user._id}/verify/${token}>here</a> to verify your email`
            }
            transporter.sendMail(mailOptions, errorHandling)

        }
        res.status(400)
        throw new Error('Please verify your email before proceeding.')
    } else {
        const response = {
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            about: user.about,
            profileImage: user.profileImage,
            major: user.major,
            matriculationYear: user.matriculationYear,
            planner: user.planner,
            token: generateToken(user._id),
            verified: user.verified
        }
        res.status(200).json(response)
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
                verified: user.verified
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

        await UserToken.create({token: token, email:  email})

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
    const valid = await UserToken.findOne({token})

    if (valid) {
        if (password) {
            if (!validPassword.test(password)) {
                res.status(400)
                throw new Error('Password needs to contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
            } else {
                await UserToken.deleteOne({token})
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
                    planner: user.planner,
                    matriculationYear: user.matriculationYear,
                    token: generateToken(user._id),
                    verified: user.verified,
                })
            }   
        } else {
            res.status(400)
            throw new Error('Please fill in your new password')
        }
    } else {
        res.status(400)
        throw new Error("Invalid token")
    }
})

// @desc  Update User Details
// @route PUT /api/users/:id
// @access Public
const updateUser = asyncHandler(async (req, res) => {
    let user;
    let message = "";

    const errorHandling  = (error, info) => {
        if (error) {
            res.status(400)
            throw new Error(`${info}`)
        } else {
            res.status(201).json('A verification email has been sent. Please check your inbox including your spam folder.')
        }
    }

    if (req.file_error) {
        res.status(400)
        throw new Error(req.file_error)
    }
    

    if (req.file) {
        
        console.log("changing image")
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            user = await User.findByIdAndUpdate(req.body.userId, {profileImage: result.secure_url, cloudinaryId: result.public_id }, {new: true})
            message = "Successful Profile Picture Change"
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
            const token = randomToken(10)
            await UserToken.create({token: token, email: req.body.email})
            user = await User.findByIdAndUpdate(req.body.userId, {email: req.body.email, verified: false}, {new: true})
            const fullUrl = req.body.url.replace('settings', '') + `users/${user._id}/verify/${token}`
            const mailOptions = {
                from: 'plannusreporting@gmail.com',
                to: req.body.email,
                subject: 'PlanNUS Email Verification',
                html: `Please click <a href = ${fullUrl}>here</a> to verify your email`
            }
            transporter.sendMail(mailOptions, errorHandling)
            message = "Successful Email Change. Please verify your new email!"
        }
        
    } if (req.body.password) {
        if (!validPassword.test(req.body.password)) {
            res.status(400)
            throw new Error('Password needs to contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        } else {
            console.log("chaning password")
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user = await User.findByIdAndUpdate(req.body.userId, {password: hashedPassword}, {new: true})
            message = "Succesful Password Change"
        }
    } if (req.body.gender) {
        console.log("changing gender")
        user = await User.findByIdAndUpdate(req.body.userId, {gender: req.body.gender}, {new: true})
        console.log(message)
        message = "Successful Gender Change"
    } if (req.body.about) {
        console.log("changing about")
        user = await User.findByIdAndUpdate(req.body.userId, {about: req.body.about}, {new: true})
        message = "Changing About information successful"
    } if (req.body.major) {
        console.log("changing major")
        user = await User.findByIdAndUpdate(req.body.userId, {major: req.body.major}, {new: true})
        message = "Successful Major Change"
    } if (req.body.matriculationYear) {
        console.log("changing matyear")
        user = await User.findByIdAndUpdate(req.body.userId, {matriculationYear: req.body.matriculationYear}, {new: true})
        message = "Successful Change in Matriculation Year"
    } if (req.body.planner) {
        user = await User.findByIdAndUpdate(req.body.userId, {planner: req.body.planner}, {new: true})
    }

    if (user) {
        const response = {
            _id: user.id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            about: user.about,
            profileImage: user.profileImage,
            major: user.major,
            matriculationYear: user.matriculationYear,
            planner: user.planner,
            token: generateToken(user._id),
            verified: user.verified,
        }
        res.status(200).json([response, message])
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
    resetEmail,
    resetPassword,
    updateUser,
    verifyUser,
}