const express = require('express')
const router = express.Router()
const {getModules, changeUndefined /*extractModules*/} = require('../controllers/moduleController')

router.get('/', getModules)
// router.get('/temp', extractModules)
module.exports = router