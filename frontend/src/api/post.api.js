import {posts} from "./fakePosts"
import {api} from './axios'

export const getPosts = async() => {
    return posts;
}

export const getPostById = async(id) => {
    const res = await api.get(`/posts/${id}`);
    return res.data;
}

export const createPost = async (data) => {
    console.log("Post /posts", data);
    return{ success: true };
}

export const deletePost = async (id) => {
    console.log("Post /delete,", id);
    const res = await api.delete(`/posts/${id}`);
    return res.data;
}

export const updatePost = async (id, data) => {
    const res = await api.put(`/posts/${id}`, data);
    return res.data;
};
