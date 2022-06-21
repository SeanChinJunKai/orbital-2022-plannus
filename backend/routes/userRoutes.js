// We are creating a router and setting up the route methods for user login registration and get personal information
const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/imageMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').put(upload.single('image'), updateUser)

module.exports = router