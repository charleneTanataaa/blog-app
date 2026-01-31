import { Link } from "react-router-dom"
import { posts } from "../api/fakePosts"

export default function Home(){
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