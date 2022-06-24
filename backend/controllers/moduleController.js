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

<<<<<<< HEAD
// @desc  Get All Requirements
// @route GET /api/req
// @access Public
const getReq = asyncHandler(async (req, res) => {
    const reqs = await Requirement.find({});
    res.status(200).json(reqs); 
})



module.exports = {
    getModules, getReq
=======
// // @desc  Get Modules
// // @route GET /api/modules/temp
// // @access Public
// const extractModules = asyncHandler(async (req, res) => {
//     const modules = await Module.find({moduleCode : {"$regex": "CS[4-6]"}})
//     const result = modules.map(module => {
//         const format = {
//             name: module.title,
//             moduleCode: module.moduleCode,
//             moduleCredit: module.moduleCredit,
//         }
//         return format;
//     })
//     console.log(result);
// })

module.exports = {
    getModules,
    // extractModules
>>>>>>> a69f3ef2fc69fa28f9fb54e731e8c24984065974
}