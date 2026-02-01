const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try{
        const { title, content } = req.body;
        if(!title || !content) 
            return res.status(400).json({ message: "All fields required"})
        
        const newPost = await Post.create({
            title,
            content,
            author: req.user.id
        });

        res.status(201).json(newPost);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}