const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require("../middleware/auth.middleware");

router.get('/:id', postController.getPostById);
router.get("/", postController.getPosts);

router.post("/", auth, postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;