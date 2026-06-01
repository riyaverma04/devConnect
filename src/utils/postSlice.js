import { createSlice } from "@reduxjs/toolkit";



const postSlice = createSlice({
  name: "posts",
  initialState: [],

  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },

    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;

      const post = state.find(
        p => p._id === postId
      );

      if (!post) return;

      const alreadyLiked =
        post.likes.includes(userId);

      if (alreadyLiked) {
        post.likes = post.likes.filter(
          id => id !== userId
        );
      } else {
        post.likes.push(userId);
      }
    },
  },
});

export const { setPosts, toggleLike } = postSlice.actions;
export default postSlice.reducer;
