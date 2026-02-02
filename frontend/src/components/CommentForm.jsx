import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addComment } from "../api/comment.api";

export default function CommentForm({ postId, setComments }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();

  if (!user) return <p className="mt-4">Login to comment.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Comment cannot be empty.");

    try {
      const comment = await addComment(postId, content);
      setComments(prev => [...prev, comment]);
      setContent("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
      <input
        type="text"
        value={content}
        placeholder="Write a comment..."
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Post Comment
      </button>
    </form>
  );
}
