import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isVotesLoading: false,
  isCommentsLoading: false,
  isRepliesLoading: false,
  hasMorePosts: true,
  message: '',
  currentPost: null,
  userPosts: null,
  sortBy: 'Time' // can take 4 values, "Time", "Rating", "Comments", "Likes" to choose what to sort by when querying data
}

// Create new posts
export const createPosts = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPosts(postData, token)
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

// Get posts
export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (requestData, thunkAPI) => {
    try {
      const sortedBy = thunkAPI.getState().posts.sortBy;
      return await postService.getPosts(requestData, sortedBy)
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

// Get specific post
export const getSpecificPost = createAsyncThunk(
  'posts/getOne',
  async (postId, thunkAPI) => {
    try {
      return await postService.getSpecificPost(postId);
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

// Delete user posts
export const deletePosts = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePosts(id, token)
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

// Like user post
export const likePosts = createAsyncThunk(
  'posts/like',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.likePosts(id, token)
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

// Dislike user post
export const dislikePosts = createAsyncThunk(
  'posts/dislike',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.dislikePosts(id, token)
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

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (commentText, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.addComment(commentText, postId, token)
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

export const likeComment = createAsyncThunk(
  'posts/likeComment',
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.likeComment(commentId, postId, token)
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

export const dislikeComment = createAsyncThunk(
  'posts/dislikeComment',
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.dislikeComment(commentId, postId, token)
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

export const addReply = createAsyncThunk(
  'posts/addReply',
  async (replyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.addReply(replyData, postId, token)
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

export const likeReply = createAsyncThunk(
  'posts/likeReply',
  async (replyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.likeReply(replyId, postId, token)
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

export const dislikeReply = createAsyncThunk(
  'posts/dislikeReply',
  async (replyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const postId = thunkAPI.getState().posts.currentPost._id
      return await postService.dislikeReply(replyId, postId, token)
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

export const getUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.getUserPosts(userId, token)
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



export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isCommentsLoading = false
      state.isRepliesLoading = false
      state.message = ''
    },
    updateSort: (state) => {
      if (state.sortBy === 'Likes') {
        state.posts.sort((post1, post2) => {
          if (post1.likes.length > post2.likes.length) {
            return -1;
          } else if (post1.likes.length < post2.likes.length) {
            return 1;
          } else {
            return 0;
          }
        })
      } else if (state.sortBy === 'Comments') {
        state.posts.sort((post1, post2) => {
          if (post1.comments.length > post2.comments.length) {
            return -1;
          } else if (post1.comments.length < post2.comments.length) {
            return 1;
          } else {
            return 0;
          }
        })
      } else if (state.sortBy === 'Time') {
        state.posts.sort((post1, post2) => {
          if (post1.createdAt > post2.createdAt) {
            return -1;
          } else if (post1.createdAt < post2.createdAt) {
            return 1;
          } else {
            return 0;
          }
        })
      } else {
        console.log("Error: No sorting type specified")
      }
    },
    sortByLikes: (state) => {
      state.sortBy = 'Likes'
    },
    sortByComments: (state) => {
      state.sortBy = 'Comments'
    },
    sortByTime: (state) => {
      state.sortBy = 'Time'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.posts = action.payload.posts
        state.hasMorePosts = action.payload.hasMorePosts
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSpecificPost.pending, (state) => {
        state.isLoading = true
        state.currentPost = null
      })
      .addCase(getSpecificPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentPost = action.payload
      })
      .addCase(getSpecificPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        )
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(likePosts.pending, (state) => {
        state.isVotesLoading = true
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.isVotesLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(likePosts.rejected, (state, action) => {
        state.isVotesLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(dislikePosts.pending, (state) => {
        state.isVotesLoading = true
      })
      .addCase(dislikePosts.fulfilled, (state, action) => {
        state.isVotesLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(dislikePosts.rejected, (state, action) => {
        state.isVotesLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(likeComment.pending, (state) => {
        state.isCommentsLoading = true
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.isCommentsLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.isCommentsLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(dislikeComment.pending, (state) => {
        state.isCommentsLoading = true
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        state.isCommentsLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(dislikeComment.rejected, (state, action) => {
        state.isCommentsLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(addReply.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(addReply.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(likeReply.pending, (state) => {
        state.isRepliesLoading = true
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isRepliesLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(likeReply.rejected, (state, action) => {
        state.isRepliesLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(dislikeReply.pending, (state) => {
        state.isRepliesLoading = true
      })
      .addCase(dislikeReply.fulfilled, (state, action) => {
        state.isRepliesLoading = false
        state.isSuccess = true
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        if (state.currentPost !== null) {
          state.currentPost = action.payload
        }
      })
      .addCase(dislikeReply.rejected, (state, action) => {
        state.isRepliesLoading = false
        state.isError = true
        state.message = action.payload 
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userPosts = action.payload
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
      })
      
  },
})

export const { reset, sortByLikes, sortByComments, sortByTime, updateSort } = postSlice.actions
export default postSlice.reducer