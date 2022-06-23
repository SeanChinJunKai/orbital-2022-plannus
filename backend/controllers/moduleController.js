const asyncHandler = require('express-async-handler')

// The user model which manages the name email password data of clients
const Module = require('../models/moduleModel')

const Token = require('../models/tokenModel')



// @desc  Get Modules
// @route GET /api/modules
// @access Public
const getModules = asyncHandler(async (req, res) => {
    const modules = await Module.find({});
    res.status(200).json(modules);
})

module.exports = {
    getModules
}