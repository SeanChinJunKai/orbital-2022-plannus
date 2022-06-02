const express = require('express')
const router = express.Router()
const {
  getPosts,
  setPosts,
  updatePosts,
  deletePosts,
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getPosts).post(protect, setPosts)
router.route('/:id').delete(protect, deletePosts).put(protect, updatePosts)

module.exports = router