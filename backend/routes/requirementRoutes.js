const express = require('express')
const router = express.Router()
const {getReq, /*createReq*/} = require('../controllers/moduleController')

router.get('/', getReq)
//router.get('/temp', createReq)

module.exports = router