import axios from 'axios'

const API_URL = '/api/posts/'

// Create new posts
const createPosts = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, postData, config)

  return response.data
}

// Get posts
const getPosts = async (requestData, sortedBy) => {
    const response = await axios.get(API_URL, {params: {postLength: requestData.postLength, sortedBy: sortedBy, updatedBySorter: requestData.updatedBySorter}})
  return response.data
}

// Delete user posts
const deletePosts = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.delete(API_URL + postId, config)

  return response.data
}

// Like posts (RMB TO TEST!)
const likePosts = async (postId, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + postId + '/like', {}, config)

  return response.data
}


// Dislike posts (RMB TO TEST!)
const dislikePosts = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + postId + '/dislike', {}, config)

  return response.data
}

const postService = {
  createPosts,
  getPosts,
  deletePosts,
  likePosts,
  dislikePosts,
}

export default postService