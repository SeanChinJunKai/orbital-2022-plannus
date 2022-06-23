const express = require('express')
const router = express.Router()
const {
  getModules
} = require('../controllers/moduleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getModules)

module.exports = router