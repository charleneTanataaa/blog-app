import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getPostById, deletePost } from "../api/post.api";
import { getCommentsByPost } from "../api/comment.api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import '../index.css';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post
    getPostById(id).then(setPost);

    // Fetch comments
    getCommentsByPost(id)
      .then(setComments)
      .catch(err => console.error("Error fetching comments:", err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const isAuthor = user?.id === post?.author?._id;

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(id);
      alert("Post deleted!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl shadow m-auto mt-10">
      <h1 className="text-2xl font-bold capitalize text-center mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm text-center mb-4">
        <i>{post.author.name}, {new Date(post.createdAt).toLocaleString()}</i>
      </p>
      <p>{post.content}</p>

      {isAuthor && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate(`/posts/${id}/edit`)}
            className="text-sm bg-green-500 px-3 py-1 text-white rounded hover:bg-green-700 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDeletePost}
            className="text-sm bg-red-500 px-3 py-1 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-6">
        <CommentList comments={comments} setComments={setComments} postId={id} />
        <CommentForm postId={id} setComments={setComments} />
      </div>
    </div>
  );
}
