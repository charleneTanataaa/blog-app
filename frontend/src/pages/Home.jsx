import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import {api} from '../api/axios';
import "../index.css";

export default function Home(){
    const [ posts, setPosts ] = useState([]);
    useEffect(()=>{
        api.get("/posts").then(res => setPosts(res.data));
    }, [])

    return(
        <>
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl mb-5 font-bold uppercase text-center">All Posts</h1>

            <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
                <div className="bg-white shadow-lg rounded-xs border border-gray-200 p-6 hover:shadow-xl transition-shadow" key={post._id}>
                    <h3 className="text-2xl font-bold">{post.title}</h3>
                    <p className="line-clamp-3 text-gray-700 mb-4">{post.content}</p>
                    <hr />
                    <div className="flex justify-between mt-2">
                    <small className="text-sm text-gray-500 mb-4">{post.author.name} {new Date(post.createdAt).toLocaleDateString()}</small>
                    <Link className="text-blue-600 hover:underline font-medium" to={`/posts/${post._id}`}>Read more</Link>
                    </div>
                </div>
                
            ))}
            </div>
        </div>
        </>
    )
}