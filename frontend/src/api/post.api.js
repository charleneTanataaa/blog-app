import {posts} from "./fakePosts"

export const getPosts = async() => {
    return posts;
}

export const getPostById = async(id) => {
    return posts.find(p => p.id === Number(id));
}

export const createPost = async (data) => {
    console.log("Post /posts", data);
    return{ success: true };
}

