const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const Reply = require('../models/replyModel')
const Module = require('../models/moduleModel')
// @desc    Get posts in increments
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {

  if (req.query.userId) {
    const userPosts = await Post.find({'user': req.query.userId}).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, '_id'  : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

      });
    res.status(200).json(userPosts)
  } else {
    // Handle cases for what order to obtain posts in
    const sortBy = req.query.sortedBy;
    const updatedBySorter = req.query.updatedBySorter === 'true';
    const postLength = parseInt(req.query.postLength);
    let posts;
    // Add more posts only if the get request is not from a sorting button
    const newPostLength = updatedBySorter ? postLength : (postLength + 10);
    if (sortBy === "Time") {
      posts = await Post.find({}).sort({createdAt: -1}).limit(newPostLength).populate('user', 'name profileImage -_id')
        .populate({
            path: 'comments',
            options: { sort: { 'createdAt': -1 } },
            populate: [{
              path: 'replies',
              model: 'Reply',
              options: { sort: { 'createdAt': -1 } },
              populate: {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
                }
              }, {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }]

        })
    } else if (sortBy === "Comments") {
      
      posts = await Post
        .aggregate(
          [
            { "$project": {
                "user": 1,
                "title": 1,
                "content": 1,
                "comments": 1,
                "likes": 1,
                "dislikes": 1,
                "createdAt": 1,
                "length": { "$size": "$comments" }
              }
            },
            { 
              "$sort": {
                "length": -1 
              } 
            }, {
              "$match": { _id : {$exists: true} }
            }, {
              "$limit" : newPostLength
            }
        ])
      posts = await Post
        .populate(posts, {
          path: 'user',
          model: 'User',
          select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
        })
      posts = await Post.populate(posts, {
            path: 'comments',
            options: { sort: { 'createdAt': -1 } },
            populate: [{
              path: 'replies',
              model: 'Reply',
              options: { sort: { 'createdAt': -1 } },
              populate: {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
                }
              }, {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }]
        })
    }  else if (sortBy === "Likes") {
      posts = await Post
        .aggregate(
          [
            { "$project": {
                "user": 1,
                "title": 1,
                "content": 1,
                "comments": 1,
                "likes": 1,
                "dislikes": 1,
                "createdAt": 1,
                "length": { "$size": "$likes" }
              }
            },
            { 
              "$sort": {
                "length": -1 
              } 
            }, {
              "$match": { _id : {$exists: true} }
            }, {
              "$limit" : newPostLength
            }
        ])
      posts = await Post
        .populate(posts, {
          path: 'user',
          model: 'User',
          select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
        })
      posts = await Post.populate(posts, {
            path: 'comments',
            options: { sort: { 'createdAt': -1 } },
            populate: [{
              path: 'replies',
              model: 'Reply',
              options: { sort: { 'createdAt': -1 } },
              populate: {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
                }
              }, {
                path: 'author',
                model: 'User',
                select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }]
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
  }
  
})


// @desc    Get particular post by id
// @route   GET /api/posts/:id
// @access  Public
const getSpecificPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: [{
          path: 'replies',
          model: 'Reply',
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }
          }, {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
          }]

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
  const posts = await Post.findById(req.params.id)
  

  // Check if post in database
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
    // Add comment to post
    const comment =  await Comment.create({
        author: req.user.id,
        content: req.body.commentText,
        replies: [],
        likes: [],
        dislikes: []
    })
  
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {comments : comment._id}}, {
      new: true,
    }).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

      })

    res.status(200).json(updatedPost)
  } else if (req.body.replyText) {
    // Add reply to comment
    
    const reply = await Reply.create({
        author: req.user.id,
        content: req.body.replyText,
        likes: [],
        dislikes: []
    })

    const updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$push : {replies : reply._id}}, {
      new: true,
    })
  
    const updatedPost = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

      })

    res.status(200).json(updatedPost)
  } else if (req.body.likeComment) {
    // Like comment. Note that likeComment is read as 'string'.
    const comment = await Comment.findById(req.body.commentId)
    let updatedComment;
    if (comment.dislikes.includes(req.user.id)) {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$pull : {dislikes: req.user.id}}, {new : true})
    }
    if (comment.likes.includes(req.user.id)) {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$pull : {likes: req.user.id}}, {new : true})
    } else {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$push : {likes: req.user.id}}, {new : true})

    }
    
    const updatedPost = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: [{
          path: 'replies',
          model: 'Reply',
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }
          }, {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
          }]

    })

    res.status(200).json(updatedPost)
  } else if (req.body.dislikeComment) {
    // DIslike comment. Note that likeComment is read as 'string'.
    const comment = await Comment.findById(req.body.commentId)
    let updatedComment;
    if (comment.likes.includes(req.user.id)) {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$pull : {likes: req.user.id}}, {new : true})
    }
    if (comment.dislikes.includes(req.user.id)) {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$pull : {dislikes: req.user.id}}, {new : true})
    } else {
      updatedComment = await Comment.findByIdAndUpdate(req.body.commentId, {$push : {dislikes: req.user.id}}, {new : true})

    }
    
    const updatedPost = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: [{
          path: 'replies',
          model: 'Reply',
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }
          }, {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
          }]

    })

    res.status(200).json(updatedPost)
  } else if (req.body.likeReply) {
    // Like reply. Note that likeReply is read as 'string'.
    const reply = await Reply.findById(req.body.replyId)
    let updatedReply;
    if (reply.likes.includes(req.user.id)) {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$pull : {dislikes: req.user.id}}, {new : true})
    }
    if (reply.dislikes.includes(req.user.id)) {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$pull : {likes: req.user.id}}, {new : true})
    } else {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$push : {likes: req.user.id}}, {new : true})

    }
    
    const updatedPost = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: [{
          path: 'replies',
          model: 'Reply',
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }
          }, {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
          }]

    })

    res.status(200).json(updatedPost)
  } else if (req.body.dislikeReply) {
    // DIslike reply. Note that likeReply is read as 'string'.
    const reply = await Reply.findById(req.body.replyId)
    let updatedReply;
    if (reply.likes.includes(req.user.id)) {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$pull : {likes: req.user.id}}, {new : true})
    }
    if (reply.dislikes.includes(req.user.id)) {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$pull : {dislikes: req.user.id}}, {new : true})
    } else {
      updatedReply = await Reply.findByIdAndUpdate(req.body.replyId, {$push : {dislikes: req.user.id}}, {new : true})

    }
    
    const updatedPost = await Post.findById(req.params.id).populate('user', 'name profileImage -_id')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: [{
          path: 'replies',
          model: 'Reply',
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }
          }, {
            path: 'author',
            model: 'User',
            select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
          }]

    })

    res.status(200).json(updatedPost)
  } else {
    // Default route, to be depreceated
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
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {likes: req.user.id}}, {new : true}).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

      })
    } else {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {likes: req.user.id}}, {new : true}).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

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
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$pull : {dislikes: req.user.id}}, {new : true}).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

      })
    } else {
      updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push : {dislikes: req.user.id}}, {new : true}).populate('user', 'name profileImage -_id')
      .populate({
          path: 'comments',
          options: { sort: { 'createdAt': -1 } },
          populate: [{
            path: 'replies',
            model: 'Reply',
            options: { sort: { 'createdAt': -1 } },
            populate: {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
              }
            }, {
              path: 'author',
              model: 'User',
              select: {'name' : 1, 'profileImage' : 1, '_id' : 0}
            }]

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
  getSpecificPost,
}