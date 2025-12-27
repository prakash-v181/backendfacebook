const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const {
  createPost,
  getAllPosts,
  getPostByUserId,
  likePost,
  sharePost,
  addCommentToPost,
  getAllStory,
  createStory
} = require('../controllers/postController');

const router = express.Router();

// create post (FIXED: media -> file)
router.post('/posts', authMiddleware, multerMiddleware.single('file'), createPost);

// get all posts
router.get('/posts', authMiddleware, getAllPosts);

// get post by userId
router.get('/posts/user/:userId', authMiddleware, getPostByUserId);

// like post
router.post('/posts/likes/:postId', authMiddleware, likePost);

// share post
router.post('/posts/share/:postId', authMiddleware, sharePost);

// comment post
router.post('/posts/comments/:postId', authMiddleware, addCommentToPost);

// create story (FIXED: media -> file)
router.post('/story', authMiddleware, multerMiddleware.single('file'), createStory);

// get all story
router.get('/story', authMiddleware, getAllStory);

module.exports = router;
