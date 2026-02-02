const router = require('express').Router();
const postController = require('../controllers/post.controller');
const commentRouter = require('./comment.routes');
const auth = require('../middleware/auth.middleware');

// Post routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

// Mount comment routes
router.use('/:postId/comments', commentRouter);

module.exports = router;
