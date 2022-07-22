import axios from 'axios'

const API_URL = '/api/posts/'

// Create new posts
const createPosts = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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

// Get specific post
const getSpecificPost = async (postId) => {
  const response = await axios.get(API_URL + postId);
  return response.data;
}

// Get user posts
const getUserPosts = async (userId) => {
  const response = await axios.get(API_URL, {params: {userId: userId}})
  return response.data
}

// Delete user posts
const deletePosts = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(`Deleting ${postId}`)
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

  const postData = {
    postId,
    likePost: true,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}


// Dislike posts
const dislikePosts = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    postId,
    dislikePost: true,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Add comment to post
const addComment = async (commentText, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    postId,
    commentText
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Like comment
const likeComment = async (commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    commentId,
    postId,
    likeComment : true
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Dislike comment
const dislikeComment = async (commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    commentId,
    postId,
    dislikeComment : true
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Add reply to comment
const addReply = async (replyData, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }


  const response = await axios.put(API_URL + postId, replyData, config)

  return response.data
}

// Like comment
const likeReply = async (replyId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    replyId,
    postId,
    likeReply : true
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Dislike comment
const dislikeReply = async (replyId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    replyId,
    postId,
    dislikeReply : true
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Edit Posts
const editPost = async (content, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    content,
    postId,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Delete Comment
const deleteComment = async (commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    commentId,
    postId,
    deleteComment: true,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

//Delete reply
const deleteReply = async (replyId, commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    replyId,
    commentId,
    postId,
    deleteReply: true,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Edit comment
const editComment = async (commentContent, commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    commentContent,
    commentId,
    postId,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Edit reply
const editReply = async (replyContent, replyId, commentId, postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    replyContent,
    replyId,
    commentId,
    postId,
  }

  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Pin post
const pinPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    postId,
    pinned: true,
  }
  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}

// Unpin post
const unpinPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const postData = {
    postId,
    unpinned: true,
  }
  const response = await axios.put(API_URL + postId, postData, config)

  return response.data
}



const postService = {
  createPosts,
  getPosts,
  getUserPosts,
  deletePosts,
  likePosts,
  dislikePosts,
  getSpecificPost,
  addComment,
  likeComment,
  dislikeComment,
  addReply,
  likeReply,
  dislikeReply,
  editPost,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
  pinPost,
  unpinPost,
}

export default postService