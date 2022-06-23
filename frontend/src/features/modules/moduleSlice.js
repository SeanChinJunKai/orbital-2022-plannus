import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import moduleService from './moduleService'

const initialState = {
    modules: [],
    semesters: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get all modules
export const getModules = createAsyncThunk(
    'modules/get',
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


  export const moduleSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        addSemester: (state) => {
          const year = ((state.semesters.length + 1) % 2 === 0 ? Math.floor((state.semesters.length + 1) / 2) : Math.floor((state.semesters.length + 1) / 2) + 1)
          const sem = (state.semesters.length % 2 + 1)
            state.semesters.push({title : 'Year ' + year
              + ' Semester ' + sem, year: year, sem: sem, modules: []})
        },
        deleteSemester : (state, action) => {
          const newSem = state.semesters.filter((semester) =>
           semester.title !== action.payload)
           state.semesters = [...newSem]
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
    }
})

export const {reset, addSemester, deleteSemester} = moduleSlice.actions
export default moduleSlice.reducer