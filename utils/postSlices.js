import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    specifiedPosts: [],
}


export const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        setPostData: (state, action) => {
            state.posts = action.payload
        },
        setSpecifiedPostData: (state, action) => {
            state.specifiedPosts = action.payload
        },
    },
})



export const { setPostData , setSpecifiedPostData } = postSlice.actions

export const PostReducer = postSlice.reducer