import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data;
});

export const fetchUserPosts = createAsyncThunk(
  "users/fetchUserPosts",
  async (userId) => {
    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    const postData = await response.json();

    const posts = Array.isArray(postData.posts)
      ? postData.posts
      : [postData.posts];

    const comments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await fetch(
          `https://dummyjson.com/comments/post/${post.id}`
        );
        const commentsData = await commentsResponse.json();

        const commentsWithUser = await Promise.all(
          commentsData.comments.map(async (comment) => {
            const userResponse = await fetch(
              `https://dummyjson.com/users/${comment.user.id}`
            );
            const userData = await userResponse.json();
            return { ...comment, user: userData };
          })
        );

        return commentsWithUser;
      })
    );

    const flattenedComments = comments.flat();

    return { posts, comments: flattenedComments };
  }
);

const initialState = {
  users: [],
  posts: [],
  comments: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.comments = action.payload.comments;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
