import axios from 'axios'

const API_URL = '/api/users/'


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

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

//Update user image
const updateUserImage = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
      }
    const response = await axios.put(API_URL + userData._id, userData, config)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register, logout, login, updateUserImage
}

export default authService