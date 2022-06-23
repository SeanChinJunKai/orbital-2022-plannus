import axios from 'axios'

const API_URL = '/api/modules/'


// Get modules
const getModules = async (requestData, sortedBy) => {
    const response = await axios.get(API_URL)
  return response.data
}

const moduleService = {
  getModules
}

export default moduleService