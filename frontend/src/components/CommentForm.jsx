import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { addComment } from "../api/comment.api";

export default function CommentForm({postId}) {
    const [content, setContent] = useState("");
    const {user} = useAuth();
    if(!user){
        return <p>Login to comment.</p>;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!content) return alert("Comment cannot be empty.");
        await addComment({postId, content, userId: user.id});
        setContent("")
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Comment</label>
            <input 
                type="text"
                value={content}
                placeholder="Comment here"
                onChange={(e) => {setContent(e.target.value)}}
            />
            <button type="submit">Post</button>
        </form>
        </>
    )
}