const asyncHandler = require('express-async-handler')
const { db } = require('../models/postModel')

const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})

  res.status(200).json(posts)
})

// @desc    Set posts
// @route   POST /api/posts
// @access  Public
const setPosts = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title')
  }

  if (!req.body.description) {
    res.status(400)
    throw new Error('Please add a description')
  }

  const posts = await Post.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
  })

  res.status(200).json(posts)
})

// @desc    Update posts
// @route   PUT /api/posts/:id
// @access  Private
const updatePosts = asyncHandler(async (req, res) => {
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

  // Make sure the logged in user matches the post user
  if (posts.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
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
// @route   POST/api/posts/:id
// @access  Public
const getComment = asyncHandler(async (req, res) => {
    const posts = await Post.findById(req.params.id)

    const arr = posts.comments
  
    res.status(200).json(arr)
})

// @desc    Add comment
// @route   POST/api/posts/:id
// @access  Private
const addComment = asyncHandler(async (req, res) => {
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
  
    // Make sure the logged in user matches the post user
    if (posts.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    const comment =  await Comment.create({
        user: req.user.id,
        comment: req.body.comment,
    })
    
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {comments : comment}}, {
      new: true,
    })
    
  
    res.status(200).json(updatedPost)
  })


module.exports = {
  getPosts,
  setPosts,
  updatePosts,
  deletePosts,
  addComment,
  getComment,
}