import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
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
            //console.error("Error reading preclusions for module: " + prevModule)
          } else {
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
                //console.error("Error reading preclusions for module: " + next)
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
    if (requirement.totalCredits > 0) {
      if ((requirement.heading === "Unrestricted Electives")) {
          if (!moduleInProgramme) {
              requirement.totalCredits -= inputModule.moduleCredit;
          } else {
              break;
          }
      } else {
          for (let subrequirement of requirement.subHeadings) {
            if (subrequirement.subHeadingTotalCredits > 0) {
              for (let criteria of subrequirement.subHeadingCriteria) {
                if (criteria.criteriaCredits > 0) {
                  for (let module of criteria.modules) {
                    if (satisfies(module.moduleCode, inputModule.moduleCode)) {
                        criteria.criteriaCredits -= module.moduleCredit;
                        subrequirement.subHeadingTotalCredits -= module.moduleCredit;
                        requirement.totalCredits -= module.moduleCredit;
                        moduleInProgramme = true;
                        
                        return requirements;
                    }
                  }
                }
                

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
      result = satisfyRequirement(result, module);
      
  }
  //console.log(JSON.stringify(result));
  return result;
}

const eligibleForGraduation = (requirements) => {
  const result = requirements.reduce((prev, requirement) => prev + requirement.totalCredits, 0) <= 0;
  // console.log(JSON.stringify(requirements));
  return requirements.length > 0 && result;
}





const canGraduate = JSON.parse(localStorage.getItem('eligible'))

// JSON.parse(localStorage.getItem('planner'))

const initialState = {
  modules: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isWarning: false,
  canGraduate: canGraduate ? canGraduate : false,
  message: '',
  requirements: [],
  selectedRequirementIndex: 0,
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

// Add module
export const addModule = createAsyncThunk('planner/addModule', async (addModuleData, thunkAPI, getState) => {
  try {
    let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner));
    let modules = JSON.parse(JSON.stringify(thunkAPI.getState().modules.modules))
    let moduleObject = addModuleData.module
    let semesterId = addModuleData.semesterId
    let modulesTakenPreviously = []
    let previousSemesters = semesters.filter((semester, idx) => idx < semesterId)
    let currentSemester = semesters.filter((semester, idx) => idx === semesterId)

    let modulesTaken = []
    semesters.forEach(semester => {
      modulesTaken = modulesTaken.concat(semester.modules)
    })
    

    // Check if module already taken
    for (let currentModule of modulesTaken) {
      if (currentModule.moduleCode === moduleObject.moduleCode) {
        //state.isError = true;
        throw new Error(`${moduleObject.moduleCode} already exists in the planner`);
      }
    }

    // Generate array of modules taken in previous semesters
    for (let previousSemester of previousSemesters) {
      modulesTakenPreviously = modulesTakenPreviously.concat(previousSemester.modules)
    }

    let relevantModules = modulesTakenPreviously.concat(currentSemester[0].modules).map(module => module.moduleCode)
    

    // Check if module's preclusions are in previous semesters
    const preclusionInPlanner = checkPreclusionInPlanner(moduleObject.moduleCode, relevantModules, [], modules)
    if (preclusionInPlanner) {
      // state.isWarning = true;
      toast.warning(`${moduleObject.moduleCode} may already exist in the planner as a preclusion, 
                        please double check against NUSMods if unsure`)
    }
    

    // Check if module already taken in previous semesters
    for (let previousModule of modulesTakenPreviously) {
      if (moduleObject.moduleCode === previousModule.moduleCode) {
        //state.isError = true;
        throw new Error(`${moduleObject.moduleCode} already exists in the planner`)
      }
    }

    // Check if pre-requisites for module are satisfied

    let prereqArray = prereqTreeToArray(moduleObject.prereqTree, moduleObject.moduleCode);
    for (let previousModule of modulesTakenPreviously) {
      prereqArray = satisfyPrereqWithPreclusions(previousModule, prereqArray);
    }

    if (prereqArray.length !== 0) {
      //state.isError = true;
      throw new Error(`You have not satisfied the following pre-requisites for ${moduleObject.moduleCode}: ${prereqArrayToString(prereqArray)}`)
    }

    

    // Add module to semester
    for (let i = 0; i < semesters.length; i++) {
      if (i === semesterId) {
        semesters[i].modules.push(moduleObject)
      }
    }
    // localStorage.setItem('planner', JSON.stringify(semesters))
    return semesters
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Delete module
export const deleteModule = createAsyncThunk('planner/deleteModule', async (deleteModuleData, thunkAPI) => {
  try {
    let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner));
    let moduleObject = deleteModuleData.module
    let semesterId = deleteModuleData.semesterId
    let precedingModules = []
    let precedingSemesters = semesters.filter((semester, idx) => idx > semesterId)

    // generate array of modules taken in preceding semesters
    for (let precedingSemester of precedingSemesters) {
      precedingModules = precedingModules.concat(precedingSemester.modules)
    }

    // generate array of modules taken 
    let isPreclusion = false;
    let errMessage = ""
    for (let precedingModule of precedingModules) {
      if (checkPreclusions(precedingModule.prereqTree, moduleObject)) {
        isPreclusion = true;
        errMessage = errMessage === ''
                        ? `Note that the following modules may 
                          require ${moduleObject.moduleCode} as a 
                          pre-requisite: ${precedingModule.moduleCode}`
                        : errMessage + `, ${precedingModule.moduleCode}`
      }
    }

    if (isPreclusion) {
      toast.warning(errMessage);
    }

    for (let i = 0; i < semesters.length; i++) {
      if (i === semesterId) {
        semesters[i].modules = semesters[i].modules.filter(module => module.moduleCode !== moduleObject.moduleCode)
      }
    }
    // localStorage.setItem('planner', JSON.stringify(semesters))
    return semesters;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// shift module from one semester to another
export const shiftModule = createAsyncThunk('planner/shiftModule', async (shiftModuleData, thunkAPI) => {
  try {
    // delete module
    let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner));
    let modules = JSON.parse(JSON.stringify(thunkAPI.getState().modules.modules))
    let moduleObject = shiftModuleData.module
    let previousSemesterId = shiftModuleData.previousSemesterId
    let precedingModules = []
    let precedingSemesters = semesters.filter((semester, idx) => idx > previousSemesterId)
    let currentSemesterId = shiftModuleData.currentSemesterId
    let modulesTakenPreviously = []
    let previousSemesters = semesters.filter((semester, idx) => idx < currentSemesterId)
    let currentSemester = semesters.filter((semester, idx) => idx === currentSemesterId)

    // generate array of modules taken in preceding semesters
    // generate array of modules taken 
    let isPreclusion = false;
    let errMessage = ""
    let index = previousSemesterId + 1;
    let lowest = Number.MAX_VALUE;
    for (let precedingSemester of precedingSemesters) {
      precedingModules = precedingModules.concat(precedingSemester.modules)
      for (let precedingModule of precedingSemester.modules) {
        if (checkPreclusions(precedingModule.prereqTree, moduleObject)) {
          lowest = index < lowest ? index : lowest;
          isPreclusion = true;
          errMessage = errMessage === ''
                          ? `Note that the following modules may 
                            require ${moduleObject.moduleCode} as a 
                            pre-requisite: ${precedingModule.moduleCode}`
                          : errMessage + `, ${precedingModule.moduleCode}`
        }
      }
      index++;
    }

    if (isPreclusion  && currentSemesterId >= lowest) {
      toast.warning(errMessage);
    }

    for (let i = 0; i < semesters.length; i++) {
      if (i === previousSemesterId) {
        semesters[i].modules = semesters[i].modules.filter(module => module.moduleCode !== moduleObject.moduleCode)
      }
    }
    // add module 

    let modulesTaken = []
    semesters.forEach(semester => {
      modulesTaken = modulesTaken.concat(semester.modules)
    })

    // Generate array of modules taken in previous semesters
    for (let previousSemester of previousSemesters) {
      modulesTakenPreviously = modulesTakenPreviously.concat(previousSemester.modules)
    }

    let relevantModules = modulesTakenPreviously.concat(currentSemester[0].modules).map(module => module.moduleCode)
  

    // Check if module's preclusions are in previous semesters
    const preclusionInPlanner = checkPreclusionInPlanner(moduleObject.moduleCode, relevantModules, [], modules)
    if (preclusionInPlanner) {
      // state.isWarning = true;
      toast.warning(`${moduleObject.moduleCode} may already exist in the planner as a preclusion after this change, 
                        please double check against NUSMods if unsure`)
    }

    // Check if pre-requisites for module are satisfied
    let prereqArray = prereqTreeToArray(moduleObject.prereqTree, moduleObject.moduleCode);
    for (let previousModule of modulesTakenPreviously) {
      prereqArray = satisfyPrereqWithPreclusions(previousModule, prereqArray);
    }

    if (prereqArray.length !== 0) {
      throw new Error(`This change will cause you to not fulfil the following pre-requisites for ${moduleObject.moduleCode}: ${prereqArrayToString(prereqArray)}`)
    }

    

    // Add module to semester
    for (let i = 0; i < semesters.length; i++) {
      if (i === currentSemesterId) {
        semesters[i].modules.push(moduleObject)
      }
    }

    
    // localStorage.setItem('planner', JSON.stringify(semesters))
    return semesters;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Check graduation fulfillment
export const checkGraduation = createAsyncThunk('planner/checkGraduation', async (_, thunkAPI) => {
  try {
    let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner))
    let requirements = JSON.parse(JSON.stringify(thunkAPI.getState().modules.requirements));
    let chosenRequirementIndex = thunkAPI.getState().modules.selectedRequirementIndex;
    let modulesTaken = []
    semesters.forEach(semester => {
      modulesTaken = modulesTaken.concat(semester.modules)
    })

    // console.log(JSON.stringify(modulesTaken.map(module => module.moduleCode)))
    // const copyRequirements = state.requirements.length > 0 ? JSON.parse(JSON.stringify(state.requirements[2].requirements)) : [];
    const copyRequirements = requirements[chosenRequirementIndex].requirements;

    const eligible = eligibleForGraduation(satisfiesProgramme(copyRequirements, modulesTaken))
    localStorage.setItem('eligible', eligible)
    return eligible;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Save semester title after editing
export const saveSemester = createAsyncThunk('planner/saveSemester', async (saveData, thunkAPI) => {
  try {
      const content = saveData.content
      const semesterId = saveData.semesterId
      let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner))
      let result = semesters.map((semester, idx) => {
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
      // localStorage.setItem('planner', JSON.stringify(result))
      return result;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Remove all modules from the semesters
export const clearSemesters = createAsyncThunk('planner/clearSemesters', async (_, thunkAPI) => {
  try {
      let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner))
      semesters.forEach(semester => semester.modules = [])
      // localStorage.setItem('planner', JSON.stringify(semesters))
      return semesters;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Add semester
export const addSemester = createAsyncThunk('planner/addSemester', async (semester, thunkAPI) => {
  try {
      let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner))
      semesters.push(semester)
      // localStorage.setItem('planner', JSON.stringify(semesters))
      return semesters;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Delete semester
export const deleteSemester = createAsyncThunk('planner/deleteSemester', async (semesterId, thunkAPI) => {
  try {
      let semesters = JSON.parse(JSON.stringify(thunkAPI.getState().auth.user.planner))
      let result = semesters.filter((semester, index) => index !== semesterId)
      // localStorage.setItem('planner', JSON.stringify(result))
      return result;
  } catch(error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

// Set requirement to view
export const setSelectedIndex = createAsyncThunk('planner/setSelectedIndex', async (index, thunkAPI) => {
  try {
      return index;
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
      .addCase(addModule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(addModule.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(deleteModule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(deleteModule.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(shiftModule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(shiftModule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(shiftModule.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(checkGraduation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkGraduation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.canGraduate = action.payload
      })
      .addCase(checkGraduation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(saveSemester.pending, (state) => {
        state.isLoading = true
      })
      .addCase(saveSemester.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(saveSemester.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(clearSemesters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(clearSemesters.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(clearSemesters.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(addSemester.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSemester.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(addSemester.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(deleteSemester.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.semesters = action.payload
      })
      .addCase(deleteSemester.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(setSelectedIndex.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setSelectedIndex.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.selectedRequirementIndex = action.payload
      })
      .addCase(setSelectedIndex.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
  },
})

export const { reset } = moduleSlice.actions
export default moduleSlice.reducer