import { useParams } from "react-router-dom"
import { posts } from "../api/fakePosts";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { getPostById } from "../api/post.api";

export default function PostDetail(){
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [id]);

    if(!post) return <p>Loading...</p>

    const isAuthor = user && user.id === post.authorId;

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><i>{post.date}</i></p>

            {isAuthor && (
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
            )}
            
        </div>
    )
}