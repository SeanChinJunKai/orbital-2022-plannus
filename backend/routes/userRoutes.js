// We are creating a router and setting up the route methods for user login registration and get personal information
const express = require('express')
const router = express.Router()
const { verifyUser, registerUser, loginUser, resetEmail, resetPassword, updateUser } = require('../controllers/userController')
const upload = require('../middleware/imageMiddleware')

router.get('/:id/verify/:token', verifyUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', resetEmail)
router.put('/', resetPassword)
router.route('/:id').put(upload.single('image'), updateUser)


module.exports = router