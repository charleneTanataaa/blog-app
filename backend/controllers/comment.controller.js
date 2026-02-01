const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try{
        const { content } = req.body;
        const { postId } = req.params;

        if(!content)
            return res.status(400).json({ message: "Content required "});

        const postExists = await Post.findById(postId);
        if(!postExists)
            return res.status(400).json({ message: "Post not found."});

        const comment = await Comment.create({
            content,
            post: postId,
            author: req.user.id
        });
        res.status(201).json(comment);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
}

exports.getCommentsByPost = async (req, res) => {
    try{
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate("author", "name email")
            .sort({ createdAt: 1})
        
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}