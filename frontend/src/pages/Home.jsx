import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import {api} from '../api/axios';

export default function Home(){
    const [ posts, setPosts ] = useState([]);
    useEffect(()=>{
        api.get("/posts").then(res => setPosts(res.data));
    }, [])

    return(
        <>
        <div>
            <h1>All Posts</h1>

            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>{post.author.name} {post.date}</small>
                    <Link to={`/posts/${post.id}`}>Read more</Link>
                    <hr />
                </div>
            ))}
        </div>
        </>
    )
}