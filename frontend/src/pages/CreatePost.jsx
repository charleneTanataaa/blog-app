import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post.api";

export default function CreatePost(){
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !content) return alert('Required.');
        await createPost({ title, content });
        navigate("/");
    }
    return(
        <>
        <h2>Create Blog</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input 
                type="text" 
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="content">Content</label>
            <input 
                type="text" 
                placeholder="content"
                onChange={(e) => setContent(e.target.value)}
            />
            <button>Create</button>
        </form>
        </>
    )
}