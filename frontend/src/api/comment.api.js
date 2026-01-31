import { comments } from "./fakeComments"

export const getCommentsByPost = async (postId) => {
    return comments.filter(c => c.postId === Number(postId));
}

export const addComment = async(postId, content, userId) => {
    console.log("POST /posts/:id/comments", {postId}, content);
    return{ success: true };
}

export const deleteComment = async(id) => {
    console.log("DELETE /comments/:id", id);
    return{ success: true};
}