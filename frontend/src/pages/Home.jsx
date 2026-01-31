import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getPosts } from "../api/post.api";

export default function Home(){
    const [ posts, setPosts ] = useState([]);
    useEffect(()=>{
        getPosts().then(data => setPosts(data))
    }, [])

    return(
        <>
        <div>
            <h1>All Posts</h1>

            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.date}</p>
                    <Link to={`/posts/${post.id}`}>Read more</Link>
                    <hr />
                </div>
            ))}
        </div>
        </>
    )
}