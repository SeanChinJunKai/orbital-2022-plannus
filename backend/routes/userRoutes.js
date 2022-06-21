// We are creating a router and setting up the route methods for user login registration and get personal information
const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, resetEmail, resetPassword} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', resetEmail)
router.get('/me', protect, getMe)
router.put('/', resetPassword)


module.exports = router