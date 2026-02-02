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

exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        
        res.json(posts);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.getPostById = async (req, res) => {
  try {
    console.log("POST ID:", req.params.id);

    const post = await Post.findById(req.params.id)
      .populate("author", "name email");

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error("GET POST ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.updatePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({ message:"Post not found. "});

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        await post.save();
        res.json(post);
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(404).json({ message: "Post not found" });
        if(post.author.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        await post.deleteOne();
        res.json({ message: "Post deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}