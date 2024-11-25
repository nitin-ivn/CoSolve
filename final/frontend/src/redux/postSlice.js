import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        selectedPost: null,
    },
    reducers: {
        // Action to set all posts
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        // Action to set a selected post
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        // Action to update the status of a specific post
        updatePostStatus: (state, action) => {
            const { postId, status } = action.payload;
            const postIndex = state.posts.findIndex(post => post._id === postId);
            if (postIndex !== -1) {
                state.posts[postIndex].status = status;
            }

            // If the updated post is the selected post
            if (state.selectedPost && state.selectedPost._id === postId) {
                state.selectedPost.status = status;
            }
        }
    }
});

export const { setPosts, setSelectedPost, updatePostStatus } = postSlice.actions;
export default postSlice.reducer;
