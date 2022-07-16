const express = require('express')
const router = express.Router()
const upload = require('../middleware/imageMiddleware')

const {
  getPosts,
  setPosts,
  updatePosts,
  deletePosts,
  getSpecificPost,
} = require('../controllers/postController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getPosts).post(protect, upload.array('postattachments', 10), setPosts)
router.route('/:id').delete(protect, deletePosts).put(protect, updatePosts).get(getSpecificPost)


module.exports = router