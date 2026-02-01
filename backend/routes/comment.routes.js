const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:postId', auth, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2Y1YjU5MzNmZTViM2M3ZjQzYTU2YiIsImlhdCI6MTc2OTk1NzEzNSwiZXhwIjoxNzcwMDQzNTM1fQ.EZzHjjok3ZYy-b7PLef--hEuw-TvjM3CWzrTRxE801c