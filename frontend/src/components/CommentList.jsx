import { useAuth } from "../context/AuthContext";
import { deleteComment } from "../api/comment.api";

export default function CommentList({comments}) {
    const {user} = useAuth();

    return(
        <>
        <div>
            <h4>Comments</h4>
            {comments.map(comment=> {
                const isAuthor = user && user.id === comment.userId;

                return (
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                        
                        {isAuthor && (
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                        )}
                        <hr/>
                    </div>
                )
            })}
        </div>
        </>
    )
}