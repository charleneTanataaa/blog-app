// comment.api.js
import { api } from "./axios";

export const getCommentsByPost = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};

export const addComment = async (postId, content) => {
  const res = await api.post(`/posts/${postId}/comments`, { content });
  return res.data;
};

export const updateComment = async (postId, commentId, data) => {
    const res = await api.put(`/posts/${postId}/comments/${commentId}`, data);
    return res.data;
}

export const deleteComment = async (postId, commentId) => {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
};

