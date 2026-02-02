import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post.api";
import {api} from '../api/axios';
import '../index.css';

export default function CreatePost(){
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/posts", {title, content});
        navigate("/");
    }
    return(
        <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold text-center mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="title" className="font-medium mb-1">Title</label>
            <input 
                className="border border-gray-300 mb-2 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text" 
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <label 
                className="font-medium mb-1"
                htmlFor="content">
                Content</label>
            <textarea 
                id="content"
                className="border border-gray-300 mb-2 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            >Create</button>
        </form>
        </div>
    )
}