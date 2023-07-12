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

export const { addPost } = postsSlice.actions;

export const addPostAsync = (post) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      console.log(data);
      dispatch(addPost(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default postsSlice.reducer;
