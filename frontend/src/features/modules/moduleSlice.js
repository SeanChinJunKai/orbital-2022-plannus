import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moduleService from './moduleService'

/*
  Deleted foundational pre-requisites for modules: MA2001, CS2101, MA2002, MA2301, MNO2706, ES2631, 
  ENV2302, ES2002, ES2007D, ESE2000, IS2101, LSM2105, LSM2106, LSM2107, LSM2212, LSM2233, 
  LSM2234, LSM2241, LSM2251, LSM2252, LSM2291, LSM2302, PC2174A
*/

// helper functions for prerequisites


// check if module code is in the prerequisite tree, return a boolean
const checkModuleCodeInPrerequisites = (prereqTree, moduleCode) => {
  if (prereqTree === undefined || prereqTree === null) {
    return false;
  }
  if (typeof(prereqTree) === 'string') {
      return moduleCode === prereqTree;
  } else {
      for (let logicConditional in prereqTree) {
          if (logicConditional === "and") {
              let result = false;
              for (let i = 0; i < prereqTree["and"].length; i++) {
                  result = result || checkModuleCodeInPrerequisites(prereqTree["and"][i], moduleCode)
              }
              return result;
          } else if (logicConditional === "or") {
              let result = false;
              for (let i = 0; i < prereqTree["or"].length; i++) {
                  result = result || checkModuleCodeInPrerequisites(prereqTree["or"][i], moduleCode)
              }
              return result;
          } else {
              throw new Error(`Invalid type ${logicConditional}`)
          }
      }
  }
}

// helper to check all preclusions of a module for prerequisites before deleting

const checkPreclusions = (prereqTree, module) => {
  let allPreclusions = [module.moduleCode];
  if (module.preclusion !== null) {
    allPreclusions = allPreclusions.concat(module.preclusion);
  }
  let result = false;
  
  for (let preclusion of allPreclusions) {
    result = result || checkModuleCodeInPrerequisites(prereqTree, preclusion);
  }
  return result;
}

//convert prereqTree to array format. level 1 modules are assumed to have no prerequisites (foundation modules)
const prereqTreeToArray = (prereqTree, moduleCode) => {
  let temp = []
  // assume level 1 modules have no prerequisites.
  let firstNum = Number(moduleCode[moduleCode.search(/[0-9]/)]);
  if (firstNum === 1) {
      return temp;
  }

  if (prereqTree === null || prereqTree === undefined) {
    return temp;
  }

  if (typeof(prereqTree) === 'string') {
      temp.push(prereqTree)
      return temp;
      
  } else {
      for (let logicConditional in prereqTree) {
          if (logicConditional === "and") {
              let result = ["and"]
              for (let i = 0; i < prereqTree["and"].length; i++) {
                  let recursedTree = prereqTreeToArray(prereqTree["and"][i], moduleCode)
                  if (recursedTree.length !== 0) {
                      result.push(recursedTree)
                  }
                  
              }
              if (result.length === 1) {
                  return [];
              }
              return result;
          } else if (logicConditional === "or") {
              let result = ["or"]
              for (let i = 0; i < prereqTree["or"].length; i++) {
                  let recursedTree = prereqTreeToArray(prereqTree["or"][i], moduleCode)
                  if (recursedTree.length !== 0) {
                      result.push(recursedTree)
                  }
              }
              if (result.length === 1) {
                  return [];
              }
              return result;
          } else {
              throw new Error(`Invalid type ${logicConditional}`)
          }
      }
  }
}


// return empty array once all requirements are satisfied.
const satisfyPrereqTree = (moduleCode, prereqTreeArray) => {
  try {
      if (prereqTreeArray.length === 0) {
          return prereqTreeArray;
      } else if (prereqTreeArray[0] === "or") {
          let temp = ["or"]
          for (let i = 1; i < prereqTreeArray.length; i++) {
              let result = satisfyPrereqTree(moduleCode, prereqTreeArray[i])
              if (result.length === 0) {
                  // if any empty subtree, return empty array immediately
                  return [];
              } else {
                  temp.push(result)
              }
          }
          return temp;
      } else if (prereqTreeArray[0] === "and") {
          let temp = ["and"]
          for (let i = 1; i < prereqTreeArray.length; i++) {
              let result = satisfyPrereqTree(moduleCode, prereqTreeArray[i])
              if (result.length !== 0) {
                  temp.push(result)
              }
          }

          
          if (temp.length === 1) {
              // if only left with the identifier "and", we will just return empty array
              return [];
          } else if (temp.length === 2) {
              // if only left with one module, return that module itself
              return temp[1];
          } else {
              return temp;
          }
      } else {
          if (moduleCode === prereqTreeArray[0]) {
              return [];
          } else {
              return prereqTreeArray;
          }
      }
  } catch (error) {
      console.log(error);
  }
  
}

// helper function to check all preclusions
const satisfyPrereqWithPreclusions = (module, prereqTreeArray) => {
  let allPreclusions = [module.moduleCode];
  if (module.preclusion !== null) {
    allPreclusions = allPreclusions.concat(module.preclusion);
  }
  let result = prereqTreeArray;
  for (let preclusion of allPreclusions) {
    result = satisfyPrereqTree(preclusion, result);
  }
  return result;

}

// check if the module code and its preclusions are in the planner
const checkPreclusionInPlanner = (module, prevModules, alreadyVisited, moduleArray) => {
  if (prevModules.includes(module)) {
    return true;
  } else {
      let result = false;
      for (let prevModule of prevModules) {
          let temp = []
          let temp2 = []
          // obtain current module's preclusions
          let preclusionArray = moduleArray.filter(module => module.moduleCode === prevModule)
          if (preclusionArray.length === 0 || !preclusionArray[0].preclusion) {
            console.error("Error reading preclusions for module: " + prevModule)
          } else {
            console.log("Checking " + prevModule)
            console.log(JSON.stringify(preclusionArray[0].preclusion))
            for (let preclusion of preclusionArray[0].preclusion) {
              // enumerate preclusions of current modules
              if (!alreadyVisited.includes(preclusion)) {
                  temp.push(preclusion)
                  alreadyVisited.push(preclusion)
              }
            }
            for (let next of temp) {
              // enumerate preclusions of the preclusions (second branch)
              let nextPreclusionArray = moduleArray.filter(module => module.moduleCode === next)
              if (nextPreclusionArray.length === 0 || !nextPreclusionArray[0].preclusion) {
                console.error("Error reading preclusions for module: " + next)
              } else {
                for (let prec of nextPreclusionArray[0].preclusion) {
                  if (!alreadyVisited.includes(prec)) {
                      temp2.push(prec)
                      alreadyVisited.push(prec)
                  }
                }
              }
            }
          }
          
          result = result || temp.concat(temp2).includes(module)
          // recursion depreceated as it causes strange module associations e.g. BT1101 and MA2001 are pre-requisites
          // checkPreclusionInPlanner(module, temp, alreadyVisited, moduleArray)
      }
      return result;
  }
}

// convert prerequisite array to string format
const prereqArrayToString = (prereqTreeArray) => {
  try {
      if (prereqTreeArray[0] === "or") {
          let temp = "("
          for (let i = 1; i < prereqTreeArray.length; i++) {
              if (prereqTreeArray[i].length !== 0) {
                  temp += prereqArrayToString(prereqTreeArray[i])
              }
              if (i !== prereqTreeArray.length - 1) {
                  temp += " or "
              }
          }
          temp += ")"
          return temp;
      } else if (prereqTreeArray[0] === "and") {
          let temp = "("
          for (let i = 1; i < prereqTreeArray.length; i++) {
              if (prereqTreeArray[i].length !== 0) {
                  temp += prereqArrayToString(prereqTreeArray[i])
              }
              
              if (i !== prereqTreeArray.length - 1) {
                  temp += " and "
              }
          }
          temp += ")"
          return temp;
      } else {
          return prereqTreeArray[0];
      }
  } catch (error) {
      console.log(error);
  }
  
}

/* helper functions for requirements */
function satisfies(moduleString, module) {
  return moduleString.includes("%") ? module.includes(moduleString.replace(/%/g, '')) : module === moduleString;
}

const satisfyRequirement = (requirements, inputModule) => {
  let moduleInProgramme = false;
  for (let requirement of requirements) {
      if ((requirement.heading === "Unrestricted Electives")) {
          if (!moduleInProgramme) {
              requirement.totalCredits -= inputModule.moduleCredit;
          } else {
              break;
          }
      } else {
          for (let subrequirement of requirement.subHeadings) {
              for (let criteria of subrequirement.subHeadingCriteria) {
                  for (let module of criteria.modules) {
                      if (satisfies(module.moduleCode, inputModule.moduleCode)) {
                          criteria.criteriaCredits -= module.moduleCredit;
                          subrequirement.subHeadingTotalCredits -= module.moduleCredit;
                          requirement.totalCredits -= module.moduleCredit;
                          
                          moduleInProgramme = true;
                      }
                  }
 
              }

          }
      }
      
  }
  return requirements;
}

const satisfiesProgramme = (requirements, modulesTakenArray) => {
  let result = requirements;
  for (let module of modulesTakenArray) {
      console.log(module)
      result = satisfyRequirement(result, module);
  }
  return result;
}

const eligibleForGraduation = (requirements) => {
  return requirements.reduce((prev, requirement) => prev + requirement.totalCredits, 0) <= 0;
}




const semesters = JSON.parse(localStorage.getItem('planner'))

const initialState = {
  modules: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isWarning: false,
  canGraduate: false,
  message: '',
  semesters: semesters ? semesters : [],
  requirements: []
}

// Get posts
export const getModules = createAsyncThunk(
  'planner/getModules',
  async (_, thunkAPI) => {
    try {
      return await moduleService.getModules()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get requirements
export const getReq = createAsyncThunk('planner/getReq', async (_, thunkAPI) => {
  try {
      return await moduleService.getReq()
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.isWarning = false
    },
    saveSemester : (state, saveData) => {
      const content = saveData.payload.content
      const semesterId = saveData.payload.semesterId
      state.semesters = state.semesters.map((semester, idx) => {
        if (idx === semesterId) {
          const editedSemester = {
            ...semester,
            title: content
          }
          return editedSemester
        } else {
          return semester;
        }
      })
      localStorage.setItem('planner', JSON.stringify(state.semesters))
    },
    addSemester: (state, semester) => {
      state.semesters.push(semester.payload)
      localStorage.setItem('planner', JSON.stringify(state.semesters))
    },
    deleteSemester: (state, semesterId) => {
      state.semesters = state.semesters.filter((semester, index) => index !== semesterId.payload)
      localStorage.setItem('planner', JSON.stringify(state.semesters))
    },
    addModule: (state, addModuleData) => {
      let moduleObject = addModuleData.payload.module
      let semesterId = addModuleData.payload.semesterId
      let modulesTakenPreviously = []
      let previousSemesters = state.semesters.filter((semester, idx) => idx < semesterId)
      let currentSemester = state.semesters.filter((semester, idx) => idx === semesterId)

      let modulesTaken = []
      state.semesters.forEach(semester => {
        modulesTaken = modulesTaken.concat(semester.modules)
      })

      // Check if module already taken
      for (let currentModule of modulesTaken) {
        if (currentModule.moduleCode === moduleObject.moduleCode) {
          state.isError = true;
          state.message = `${moduleObject.moduleCode} already exists in the planner`
          return;
        }
      }

      // Generate array of modules taken in previous semesters
      for (let previousSemester of previousSemesters) {
        modulesTakenPreviously = modulesTakenPreviously.concat(previousSemester.modules)
      }

      let relevantModules = modulesTakenPreviously.concat(currentSemester[0].modules).map(module => module.moduleCode)

      // Check if module's preclusions are in previous semesters
      const preclusionInPlanner = checkPreclusionInPlanner(moduleObject.moduleCode, relevantModules, [], state.modules)
      if (preclusionInPlanner) {
        state.isWarning = true;
        state.message = `${moduleObject.moduleCode} may already exist in the planner as a preclusion, 
                          please check against NUSMods if unsure`
      }

      // Check if module already taken in previous semesters
      for (let previousModule of modulesTakenPreviously) {
        if (moduleObject.moduleCode === previousModule.moduleCode) {
          state.isError = true;
          state.message = `${moduleObject.moduleCode} already exists in the planner`
          return;
        }
      }

      // Check if pre-requisites for module are satisfied

      let prereqArray = prereqTreeToArray(moduleObject.prereqTree, moduleObject.moduleCode);
      for (let previousModule of modulesTakenPreviously) {
        prereqArray = satisfyPrereqWithPreclusions(previousModule, prereqArray);
      }

      if (prereqArray.length !== 0) {
        state.isError = true;
        state.message = `You have not satisfied the following pre-requisites for ${moduleObject.moduleCode}: ${prereqArrayToString(prereqArray)}`
        return;
      }

      

      // Add module to semester
      for (let i = 0; i < state.semesters.length; i++) {
        if (i === semesterId) {
          state.semesters[i].modules.push(moduleObject)
        }
      }
      localStorage.setItem('planner', JSON.stringify(state.semesters))
    },
    deleteModule : (state, deleteModuleData) => {
      let moduleObject = deleteModuleData.payload.module
      let semesterId = deleteModuleData.payload.semesterId
      let precedingModules = []
      let precedingSemesters = state.semesters.filter((semester, idx) => idx > semesterId)

      // generate array of modules taken in preceding semesters
      for (let precedingSemester of precedingSemesters) {
        precedingModules = precedingModules.concat(precedingSemester.modules)
      }

      // generate array of modules taken 
      for (let precedingModule of precedingModules) {
        if (checkPreclusions(precedingModule.prereqTree, moduleObject)) {
          state.isError = true;
          state.message = state.message === ''
                          ? `Unable to delete module as the following modules 
                            require ${moduleObject.moduleCode} as a 
                            pre-requisite: ${precedingModule.moduleCode}`
                          : state.message + `, ${precedingModule.moduleCode}`
        }
      }

      if (state.message === '') {
        // Add module to semester
        for (let i = 0; i < state.semesters.length; i++) {
          if (i === semesterId) {
            state.semesters[i].modules = state.semesters[i].modules.filter(module => module.moduleCode !== moduleObject.moduleCode)
          }
        }
        localStorage.setItem('planner', JSON.stringify(state.semesters))
      } else {
        return;
      }
      
    },
    clearSemesters: (state) => {
      state.semesters.map(semester => semester.modules = [])
      localStorage.setItem('planner', JSON.stringify(state.semesters))
    },
    checkGraduation : (state) => {
      let modulesTaken = []
      semesters.forEach(semester => {
        modulesTaken = modulesTaken.concat(semester.modules)
      })
      state.canGraduate = eligibleForGraduation(satisfiesProgramme(state.requirements[2].requirements, modulesTaken))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModules.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.modules = action.payload
      })
      .addCase(getModules.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(getReq.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReq.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.requirements = action.payload
      })
      .addCase(getReq.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
  },
})

export const { reset, saveSemester, addSemester, deleteSemester, addModule, deleteModule, clearSemesters, checkGraduation } = moduleSlice.actions
export default moduleSlice.reducer