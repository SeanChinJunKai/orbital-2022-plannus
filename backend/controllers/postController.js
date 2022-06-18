const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// @desc    Get 10 posts in increments
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {

  // Handle cases for what order to obtain posts in
  const sortBy = req.query.sortedBy;
  const updatedBySorter = req.query.updatedBySorter === 'true';
  const postLength = parseInt(req.query.postLength);
  let posts;
  // Add more posts only if the get request is not from a sorting button
  const newPostLength = updatedBySorter ? postLength : (postLength + 10);
  if (sortBy === "Time") {
    posts = await Post.find({}).sort({createdAt: -1}).limit(newPostLength).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
  } else if (sortBy === "Comments") {
    posts = await Post.find({}).sort({comments: -1}).limit(newPostLength).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
  }  else if (sortBy === "Likes") {
    posts = await Post.find({}).sort({likes: -1}).limit(newPostLength).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
  } else {
    res.status(400)
    throw new Error('Please specify sorting order')
  }
  const numberOfPosts = await Post.countDocuments({})
  

  // Check if there are any more posts to display
  const hasMorePosts = numberOfPosts > newPostLength;
  const response = {
    posts: posts,
    hasMorePosts: hasMorePosts
  }

  res.status(200).json(response)
})


// @desc    Get particular post by id
// @route   GET /api/posts/:id
// @access  Public
const getSpecificPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
  // Check if there are any more posts to display
  res.status(200).json(post)
})

// @desc    Set posts
// @route   POST /api/posts
// @access  Private
const setPosts = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title')
  }

  if (!req.body.content) {
    res.status(400)
    throw new Error('Please add contents')
  }

  const posts = await Post.create({
    user: req.user.id,
    title: req.body.title,
    content: req.body.content,
    comments: [],
    likes: [],
    dislikes: []
    
  })

  res.status(200).json(posts)
})

// @desc    Update posts
// @route   PUT /api/posts/:id
// @access  Private
const updatePosts = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.params.id).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })

  if (!posts) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (req.body.commentText) {
    const comment =  await Comment.create({
        author: req.user.id,
        content: req.body.commentText,
        replies: [],
        likes: [],
        dislikes: []
    })
  
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {comments : comment._id}}, {
      new: true,
    }).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })

    res.status(200).json(updatedPost)
  } else {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedPost)
  }

  

  
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePosts = asyncHandler(async (req, res) => {
  const posts = await Post.findById(req.params.id)

  if (!posts) {
    res.status(400)
    throw new Error('Post not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (posts.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await posts.remove()

  res.status(200).json({ id: req.params.id })
})

// @desc    Get comment
// @route   GET/api/posts/:id
// @access  Public
const getComment = asyncHandler(async (req, res) => {
    const posts = await Post.findById(req.params.id)

    const arr = posts.comments
  
    res.status(200).json(arr)
})

// @desc    Add comment
// @route   PUT/api/posts/:id
// @access  Private
// <-- REMOVED AS THERE ARE TWO PUT HANDLERS TO /api/posts/:id, which causes error! -->
// const addComment = asyncHandler(async (req, res) => {
//     const posts = await Post.findById(req.params.id)
  
//     if (!posts) {
//       res.status(400)
//       throw new Error('Post not found')
//     }
  
//     // Check for user
//     if (!req.user) {
//       res.status(401)
//       throw new Error('User not found')
//     }

//     const comment =  await Comment.create({
//         user: req.user.id,
//         comment: req.body.comment,
//     })
    
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {comments : comment}}, {
//       new: true,
//     })
    
  
//     res.status(200).json(updatedPost)
//   })

  // @desc    Like post
  // @route   PUT/api/posts/:id/like
  // @access  Private

  const likePosts = asyncHandler(async (req, res) => {
    const posts = await Post.findById(req.params.id)

    if (!posts) {
      res.status(400)
      throw new Error('Post not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    let updatedPost;

    if (posts.dislikes.includes(req.user.id)) {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {dislikes: req.user.id}}, {new : true})
    }
    if (posts.likes.includes(req.user.id)) {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {likes: req.user.id}}, {new : true}).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
    } else {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {likes: req.user.id}}, {new : true}).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
    }
    res.status(200).json(updatedPost)
  })


  // @desc    Dislike post
  // @route   PUT/api/posts/:id/dislike
  // @access  Private

  const dislikePosts = asyncHandler(async (req, res) => {
    const posts = await Post.findById(req.params.id)
  
    if (!posts) {
      res.status(400)
      throw new Error('Post not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    let updatedPost;
    if (posts.likes.includes(req.user.id)) {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {likes: req.user.id}}, {new : true})
    }
    if (posts.dislikes.includes(req.user.id)) {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {dislikes: req.user.id}}, {new : true}).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
    } else {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {dislikes: req.user.id}}, {new : true}).populate('user').populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
    }
    
  
    res.status(200).json(updatedPost)
  })

  


module.exports = {
  getPosts,
  setPosts,
  updatePosts,
  deletePosts,
  likePosts,
  dislikePosts,
  //addComment,
  getComment,
  getSpecificPost
}