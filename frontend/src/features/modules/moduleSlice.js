import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import moduleService from './moduleService'

const initialState = {
    modules: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get all modules
export const getModules = createAsyncThunk(
    'posts/modules',
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

export const {reset} = moduleSlice.actions
export default moduleSlice.reducer