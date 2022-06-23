const asyncHandler = require('express-async-handler')

const Module = require('../models/moduleModel')



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