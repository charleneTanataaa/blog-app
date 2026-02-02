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
        await comment.populate("author", "name email");

        
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

exports.updateComment = async(req, res) => {
    try{
        const {content} = req.body;
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment) 
            return res.status(404).json({message: "Comment not found"});

        if(comment.author.toString() !== req.user.id)
            return res.status(403).json({message: "Forbidden"});

        comment.content = content || comment.content;
        await comment.save();
        await comment.populate("author", "name email");
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteComment = async(req, res) =>{
    try{
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment)
            return res.status(404).json({ message: "Comment not found."})

        if(comment.author.toString() !== req.user.id){
            return res.status(403).json({ message: "Forbidden "})
        }

        await comment.deleteOne();
        res.json({ message: "Comment deleted"});
    } catch (err){
        res.status(500).json({ message: err.message});
    }
}