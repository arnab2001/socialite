import { light } from '@mui/material/styles/createPalette';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: light,
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setMode: (state) => {
            state.mode = state.mode === light ? dark : light;
        },

    setLogin : (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    setLogout : (state) => {
        state.user = null;
        state.token = null;
    },
    setFriends : (state, action) => {
        if (state.user) {
            state.user.friends = action.payload.friends;
        }else{
            console.log("User not found");
        }
    },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) {
                return action.payload.post;
            }
            return post;
        });
    }
}
});


export const { 
    setMode,
    setLogin, 
    setLogout, 
    setFriends, 
    setPosts, 
    setPost } = appSlice.actions;

export default appSlice.actions; 

