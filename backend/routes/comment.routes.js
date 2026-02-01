const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:postId', auth, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;
