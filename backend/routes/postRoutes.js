const express = require('express')
const router = express.Router()
const {
  getPosts,
  setPosts,
  updatePosts,
  deletePosts,
  addComment,
  getComment,
  likePosts,
  dislikePosts,
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getPosts).post(protect, setPosts)
router.route('/:id').delete(protect, deletePosts).put(protect, updatePosts).put(protect, addComment).get(protect, getComment)
router.route('/:id/like').put(protect, likePosts)
router.route('/:id/dislike').put(protect, dislikePosts)

module.exports = router