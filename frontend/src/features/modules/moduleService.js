import axios from 'axios'

const API_URL = '/api/modules/'

// Get all modules
const getModules = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const moduleService = {
    getModules
}

export default moduleService