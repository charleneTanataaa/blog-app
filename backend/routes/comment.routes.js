const router = require('express').Router({ mergeParams: true });
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, commentController.createComment);
router.get('/', commentController.getCommentsByPost);
router.put('/:commentId', auth, commentController.updateComment);
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
