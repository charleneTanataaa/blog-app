import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/post.api";
import '../index.css';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id).then(post => {
            setTitle(post.title);
            setContent(post.content);
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, { title, content });
            alert("Post updated!");
            navigate(`/posts/${id}`);
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={6}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
