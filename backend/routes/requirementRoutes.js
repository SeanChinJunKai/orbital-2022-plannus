const express = require('express')
const router = express.Router()
const {getReq} = require('../controllers/moduleController')

router.get('/', getReq)

module.exports = router