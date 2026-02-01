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

exports.getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        
        res.json(posts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}