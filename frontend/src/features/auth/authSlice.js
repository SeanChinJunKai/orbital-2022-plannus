import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

localStorage.clear()
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user : null,
    resetVerified: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get Info
export const verifyUser = createAsyncThunk('auth/verify', async (user, thunkAPI) => {
    try {
        return await authService.verifyUser(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Reset email code sent
export const resetEmail = createAsyncThunk('auth/email', async (email, thunkAPI) => {
    try {
        return await authService.resetEmail(email)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update user image
export const updateUserImage = createAsyncThunk('auth/updateUserImage', async (formData, thunkAPI) => {
    try {
        return await authService.updateUserImage(formData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Reset password
export const resetPassword = createAsyncThunk('auth/reset', async (user, thunkAPI) => {
    try {
        return await authService.resetPassword(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// Update user details
export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (formData, thunkAPI) => {
    try {
        const _id = thunkAPI.getState().auth.user._id;
        const userData = {...formData, userId: _id}
        return await authService.updateUserDetails(userData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update user planner 
export const updateUserPlanner= createAsyncThunk('auth/updateUserPlanner', async (_, thunkAPI) => {
    try {
        const _id = thunkAPI.getState().auth.user._id;
        const userData = {planner: thunkAPI.getState().modules.semesters, userId: _id}
        return await authService.updateUserPlanner(userData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Ban user
export const banUser= createAsyncThunk('auth/banUser', async (id, thunkAPI) => {
    try {
        const _id = thunkAPI.getState().auth.user._id;
        const userData = {userId: id, moderatorId: _id, banned: true}
        return await authService.banUser(userData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(verifyUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(resetEmail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.resetVerified = action.payload.verified
                state.message = action.payload.message
                
            })
            .addCase(resetEmail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(updateUserImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserImage.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload[0]
                state.message = action.payload[1]
            })
            .addCase(updateUserImage.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload[0]
                state.message = action.payload[1]
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUserPlanner.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserPlanner.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload[0]
            })
            .addCase(updateUserPlanner.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(banUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(banUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload[0]
            })
            .addCase(banUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer