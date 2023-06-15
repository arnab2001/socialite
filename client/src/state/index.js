import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  comments: [], // new state for comments
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
      console.log("0 setPosts - from client/state", state.posts);
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        console.log("1 setPost - from client/state", post);
        return post;
        
      });
      state.posts = updatedPosts;
      
    },
    setPostComments: (state, action) => { // new reducer for comments
      const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
      if (postIndex !== -1) {
        state.posts[postIndex].comments = action.payload.comments;
      }
      state.comments = action.payload.comments;
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setPostComments } =
  authSlice.actions;
export default authSlice.reducer;
