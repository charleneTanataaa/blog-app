const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require("../middleware/auth.middleware");

router.post("/", auth, postController.createPost);
router.get("/", postController.getPosts);

module.exports = router;