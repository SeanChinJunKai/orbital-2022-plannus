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

// @desc  Create Requirement Helper
// @route GET /api/req
// @access Public
const createReq = asyncHandler(async (req, res) => {
    const data = {
        title: "Bachelor of Science in Business Analytics",
        requirements: [
            {
                heading: "Common Curriculum Requirements",
                totalCredits: 40,
                subHeadings: [
                    {
                        subHeadingTitle: "University Level Requirements",
                        subHeadingTotalCredits: 24,
                        subHeadingCriteria: [
                            {
                                criteriaTitle: "Digital Literacy",
                                criteriaCredits: 4,
                                modules : [
                                    {
                                        name: "Programming Methodology",
                                        moduleCode: "CS1010S",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Critique and Expression",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Any GEX module",
                                        moduleCode: "GEX%",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Cultures and Connections",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Any GEC module",
                                        moduleCode: "GEC%",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Data Literacy",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Introduction to Business Analytics",
                                        moduleCode: "BT1101",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Singapore Studies",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Any GES module",
                                        moduleCode: "GES%",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Communities and Engagement",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Any GEN module",
                                        moduleCode: "GEN%",
                                        moduleCredit: 4
                                    }
                                ]
                            }
        
                        ]
                    },
                    {
                        subHeadingTitle: "Computing Ethics",
                        subHeadingTotalCredits: 4,
                        subHeadingCriteria: [
                            {
                                criteriaTitle: "",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Digital Ethics and Data Privacy",
                                        moduleCode: "IS1108",
                                        moduleCredit: 4
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        subHeadingTitle: "Interdisciplinary & Cross-Disciplinary Education",
                        subHeadingTotalCredits: 12,
                        subHeadingCriteria: [
                            {
                                criteriaTitle: "Interdisciplinary Modules",
                                criteriaCredits: 8,
                                modules: [
                                    {
                                        name: "IT Management and Organisation",
                                        moduleCode: "IS1128",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Digital Platforms for Businesses",
                                        moduleCode: "IS2218",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Economics of IT and AI",
                                        moduleCode: "IS2238",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "The Human Condition",
                                        moduleCode: "HSH1000",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Understanding Social Complexity",
                                        moduleCode: "HSS1000",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Asian Interconnections",
                                        moduleCode: "HSA1000",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "How Science Works, Why Science Works",
                                        moduleCode: "HSI1000",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Scientific Inquiry & Health: Good Science, Bad Science",
                                        moduleCode: "HSI2001",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Inquiry into Current Sporting Beliefs and Practices",
                                        moduleCode: "HSI2002",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "From DNA to Gene Therapy",
                                        moduleCode: "HSI2003",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Cell Based Proteins for a Sustainable Future",
                                        moduleCode: "HSI2004",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Our Science Stories and You",
                                        moduleCode: "HSI2005",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Deconstructing Food",
                                        moduleCode: "HSI2007",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "A Brief History of Science & Why Things Often Go Wrong",
                                        moduleCode: "HSI2008",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "What is a Planet?",
                                        moduleCode: "HSI2009",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "New Worlds Beyond Earth",
                                        moduleCode: "HSI2010",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "The World of Quantum",
                                        moduleCode: "HSI2011",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "The Science of Music",
                                        moduleCode: "HSI2013",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Science. Medical Technology and Society",
                                        moduleCode: "HSI2014",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Design Thinking",
                                        moduleCode: "DTK1234",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Design and Make",
                                        moduleCode: "EG1311",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Liveable Cities",
                                        moduleCode: "EG2501",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Systems Thinking and Dynamics",
                                        moduleCode: "IE2141",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Fundamentals of Project Management",
                                        moduleCode: "PF1101",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Crossdisciplinary Modules",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Account for Decision Makers",
                                        moduleCode: "ACC1701X",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Operations and Technology Management",
                                        moduleCode: "DAO2703",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Organisational Behavior",
                                        moduleCode: "MNO1706X",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Making Sense of Society",
                                        moduleCode: "SC1101E",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "The Nature of Language",
                                        moduleCode: "EL1101E",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Introduction to Philosophy, Politics and Economics",
                                        moduleCode: "PE1021P",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Our Planet: An Earth System Science Perspective",
                                        moduleCode: "GE2103",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Planet Earth",
                                        moduleCode: "XD3103",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Weather and Climate",
                                        moduleCode: "GE3253",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Aquatic, Riparian and Coastal Systems",
                                        moduleCode: "GE3255",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Earth Surface Processes, Landforms and Ecosystems",
                                        moduleCode: "GE3256",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Public Health and Epidemiology",
                                        moduleCode: "SPH2002",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Sociology of Mental Health",
                                        moduleCode: "SC2226",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Healthy Ageing and Well-being",
                                        moduleCode: "NUR1113A",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "User-Centred Collaborative Design",
                                        moduleCode: "EG2201A",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "EG2310 Fundamentals of Systems Design",
                                        moduleCode: "EG2310",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Any PC module",
                                        moduleCode: "PC%",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Any CM module",
                                        moduleCode: "CM%",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Any LSM module",
                                        moduleCode: "LSM%",
                                        moduleCredit: 4
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                heading: "Programme Requirements",
                totalCredits: 80,
                subHeadings: [
                    {
                        subHeadingTitle: "Core Modules",
                        subHeadingTotalCredits: 60,
                        subHeadingCriteria: [
                            {
                                criteriaTitle: "Algebra",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Matrix Algebra",
                                        moduleCode: "MA1311",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Linear Algebra I",
                                        moduleCode: "MA2001",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "Calculus",
                                criteriaCredits: 4,
                                modules: [
                                    {
                                        name: "Calculus for Computing",
                                        moduleCode: "MA1521",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Calculus",
                                        moduleCode: "MA2002",
                                        moduleCredit: 4
                                    }
                                ]
                            },
                            {
                                criteriaTitle: "",
                                criteriaCredits: 40,
                                modules: [
                                    {
                                        name: "Econometrics Modeling for Business Analytics",
                                        moduleCode: "BT2101",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Data Management and Visualisation",
                                        moduleCode: "BT2102",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Programming Methodology I",
                                        moduleCode: "CS2030",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Data Structures and Algorithms",
                                        moduleCode: "CS2040",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Business and Technical Communication",
                                        moduleCode: "IS2101",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Probability and Statistics",
                                        moduleCode: "ST2334",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Application Systems Development for Business Analytics",
                                        moduleCode: "BT3103",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Information Systems Leadership and Communication",
                                        moduleCode: "IS3103",
                                        moduleCredit: 4
                                    },
                                    {
                                        name: "Business Analytics Capstone Project",
                                        moduleCode: "BT4103",
                                        moduleCredit: 8
                                    },
                                ]
                            },
                            {
                                criteriaTitle: "Industry Experience/Dissertation",
                                criteriaCredits: 12,
                                modules: [
                                    {
                                        name: "B.Sc. Dissertation",
                                        moduleCode: "BT4101",
                                        moduleCredit: 12
                                    },
                                    {
                                        name: "Advanced Technology Attachment Programme",
                                        moduleCode: "CP3880",
                                        moduleCredit: 12
                                    },
                                    {
                                        name: "Industry Internship Programme",
                                        moduleCode: "IS4010",
                                        moduleCredit: 12
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        subHeadingTitle: "Programme Electives",
                        note: `Complete 5 Business Analytics programme elective modules with 
                        at least 3 modules at Level-4000 and at least 3 must be BT coded modules.`,
                        subHeadingTotalCredits: 20,
                        subHeadingCriteria: [
                            {
                                criteriaTitle: "",
                                criteriaCredits: 20,
                                modules: [
                                    {
                                        name: "Dynamic Pricing and Revenue Management",
                                        moduleCode: "DBA3712",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Manufacturing Logistics",
                                        moduleCode: "IE3120",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Digital Platform Strategy and Architecture",
                                        moduleCode: "IS3240",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Feature Engineering for Machine Learning",
                                        moduleCode: "BT3017",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Computational Methods for Business Analytics",
                                        moduleCode: "BT3102",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Optimization Methods for Business Analytics",
                                        moduleCode: "BT3104",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Operations Research I",
                                        moduleCode: "IE2110",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Introduction to Optimisation",
                                        moduleCode: "DBA3701",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Machine Learning",
                                        moduleCode: "CS3244",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Predictive Analytics in Business",
                                        moduleCode: "DBA3803",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Regression Analysis",
                                        moduleCode: "ST3131",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Data Engineering",
                                        moduleCode: "IS3107",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "ERP Systems with Analytics Solutions",
                                        moduleCode: "IS3221",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Mobile Apps Development for Enterprise",
                                        moduleCode: "IS3261",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Analytics for Capital Market Trading and Investment",
                                        moduleCode: "BT4013",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Risk Analytics for Financial Services",
                                        moduleCode: "BT4016",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Data-Driven Marketing",
                                        moduleCode: "BT4211",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Search Engine Optimization and Analytics",
                                        moduleCode: "BT4212",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Analytical Tools for Consulting",
                                        moduleCode: "DBA4811",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Social Media Network Analysis",
                                        moduleCode: "IS4241",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "IT-enabled Healthcare Solutioning",
                                        moduleCode: "IS4250",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Digital Product Management",
                                        moduleCode: "IS4262",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Market Analytics",
                                        moduleCode: "MKT4812",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Econometrics for Business II",
                                        moduleCode: "BSE4711",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Fraud Analytics",
                                        moduleCode: "BT4012",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Geospatial Analytics",
                                        moduleCode: "BT4015",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Big Data Techniques and Technologies",
                                        moduleCode: "BT4221",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Mining Web Data for Business Insights",
                                        moduleCode: "BT4222",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Machine Learning for Predictive Data Analytics",
                                        moduleCode: "BT4240",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Social Media Network Analysis",
                                        moduleCode: "IS4241",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Operations Research II",
                                        moduleCode: "IE4210",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Statistical Methods for Finance",
                                        moduleCode: "ST4245",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Analytics Driven Design of Adaptive Systems",
                                        moduleCode: "BT4014",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Business Analytics Solutions Development and Deployment",
                                        moduleCode: "BT4301",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Systematic Trading Strategies and Systems",
                                        moduleCode: "IS4226",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Information Technologies in Financial Services",
                                        moduleCode: "IS4228",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Compliance and Regulation Technology",
                                        moduleCode: "IS4234",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Smart Systems and AI Governance",
                                        moduleCode: "IS4246",
                                        moduleCredit: 4,
                                    },
                                    {
                                        name: "Blockchain and Distributed Ledger Technologies",
                                        moduleCode: "IS4302",
                                        moduleCredit: 4,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                heading: "Unrestricted Electives",
                totalCredits: 40,
            }
        ]
    }
    const a = await Requirement.create(data)
    console.log("created")
    res.status(200); 
})

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
    getModules, getReq, createReq
    // extractModules
}
