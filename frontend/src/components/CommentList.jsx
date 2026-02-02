import { useAuth } from "../context/AuthContext";
import { deleteComment, updateComment } from "../api/comment.api";
import { useState } from "react";

export default function CommentList({ comments, setComments , postId}) {
  const { user } = useAuth();
  const [ editingId, setEditingId ] = useState(null);
  const [ editContent, setEditContent ] = useState("");

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteComment(postId, commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEditClick = (comment) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  }
  const handleSaveEdit = async (commentId) => {
    try {
        const updatedComment = await updateComment(postId, commentId, {content: editContent});
        setComments(prev => prev.map(c => c._id === commentId ? updatedComment : c));
        setEditingId(null);
        setEditContent("");
    } catch (err) {
        alert(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map(comment => {
        const isAuthor = user && user.id === comment.author._id;
        const isEditing = editingId === comment._id;

        return (
          <div key={comment._id} className="mb-2 border-b pb-2">
            {
                isEditing ? (
                    <div>
                        <textarea 
                        className="w-full border rounded p-2 mb-2" 
                        onChange={(e)=> setEditContent(e.target.value)}
                        value={editContent}
                        rows='2'
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleSaveEdit(comment._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                                Save
                            </button>
                            <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white text-sm hover:bg-gray-700 rounded px-3 py-1">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                <>
                    <p><strong>{comment.author.name}:</strong> {comment.content}</p>
                    {isAuthor && (
                    <div className="flex space-x-2 mt-1">
                        <button
                        onClick={() => handleEditClick(comment)}
                        className="text-blue-500 text-sm hover:underline"
                        >
                        Edit
                        </button>
                        <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 text-sm hover:underline"
                        >
                        Delete
                        </button>
                    </div>
                    )}
                </>
                )}
            </div>
            );
        })}
        </div>
    );
}