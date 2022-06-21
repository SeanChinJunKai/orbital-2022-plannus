import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    resetEmail: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

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

<<<<<<< HEAD
// Reset email code sent
export const resetEmail = createAsyncThunk('auth/email', async (email, thunkAPI) => {
    try {
        return await authService.resetEmail(email)
=======
// Update user image
export const updateUserImage = createAsyncThunk('auth/updateUserImage', async (formData, thunkAPI) => {
    try {
        return await authService.updateUserImage(formData)
>>>>>>> settings-page-setup
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

<<<<<<< HEAD
// Reset password
export const resetPassword = createAsyncThunk('auth/reset', async (user, thunkAPI) => {
    try {
        return await authService.resetPassword(user)
=======
// Update user details
export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (formData, thunkAPI) => {
    try {
        const _id = thunkAPI.getState().auth.user._id;
        const userData = {...formData, userId: _id}
        console.log(userData)
        return await authService.updateUserDetails(userData)
>>>>>>> settings-page-setup
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

<<<<<<< HEAD


=======
>>>>>>> settings-page-setup

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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
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
                state.resetEmail = action.payload.email
                state.message = action.payload.message
                
            })
            .addCase(resetEmail.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.resetEmail = ''
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
                state.user = action.payload
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
                state.user = action.payload
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer