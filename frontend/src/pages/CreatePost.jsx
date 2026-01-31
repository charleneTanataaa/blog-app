import { useState } from "react";

export default function CreatePost(){
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Create post: ", title, content);
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