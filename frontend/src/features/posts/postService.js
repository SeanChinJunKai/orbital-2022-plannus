import axios from 'axios'

const API_URL = '/api/posts'

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
const getPosts = async () => {
    const response = await axios.get(API_URL)

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

const postService = {
  createPosts,
  getPosts,
  deletePosts,
}

export default postService