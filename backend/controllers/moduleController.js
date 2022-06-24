const asyncHandler = require('express-async-handler')

const Module = require('../models/moduleModel')

const Requirement = require('../models/requirementsModel')

// @desc  Get Modules
// @route GET /api/modules
// @access Public
const getModules = asyncHandler(async (req, res) => {
    const modules = await Module.find({});
    res.status(200).json(modules);
})

// @desc  Get All Requirements
// @route GET /api/req
// @access Public
const getReq = asyncHandler(async (req, res) => {
    const reqs = await Requirement.find({});
    res.status(200).json(reqs); 
})



module.exports = {
    getModules, getReq
}