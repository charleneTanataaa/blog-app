import { useParams } from "react-router-dom"
import { posts } from "../api/fakePosts";

export default function PostDetail(){
    const { id } = useParams();
    const post = posts.find(p => p.id === Number(id))

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><i>{post.date}</i></p>

            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}