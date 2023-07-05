import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    clearPosts: (state) => {
      state.length = 0;
    },
  },
});

export const { addPost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
