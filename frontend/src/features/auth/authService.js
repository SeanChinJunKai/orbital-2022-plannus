import axios from 'axios'

const API_URL = '/api/users/'


// Verify user
const verifyUser = async (userData) => {
    const response = await axios.get(API_URL + userData.id + '/verify/' + userData.token, {})
    console.log(API_URL + userData.id + '/verify/' + userData.token)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    return response.data
}

// Logout user

const logout = async () => {
    localStorage.removeItem('user')
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// send email
const resetEmail = async (email) => {
    const response = await axios.get(API_URL, {params: {email: email}})
    return response.data
}

// reset the users password
const resetPassword = async (userData) => {
    const response = await axios.put(API_URL, userData)
    return response.data
}



//Update user image
const updateUserImage = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
      }
    const response = await axios.put(API_URL + userData.get("userId"), userData, config)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Update user image
const updateUserDetails = async (userData) => {
    const response = await axios.put(API_URL + userData.userId, userData)
    console.log(response.data)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Update user planner
const updateUserPlanner = async (userData) => {
    const response = await axios.put(API_URL + userData.userId, userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


const authService = {
   verifyUser, register, logout, login, updateUserImage, updateUserDetails, updateUserPlanner, resetEmail, resetPassword
}

export default authService