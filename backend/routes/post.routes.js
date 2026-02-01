const router = require('express').Router();
const { createPost } = require('../controllers/post.controller');
const auth = require("../middleware/auth.middleware");

router.post("/", auth, createPost);

module.exports = router;