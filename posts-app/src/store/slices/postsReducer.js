import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: [], searchedPosts: [], error: null };

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPosts: (state) => {
      return {
        ...state,
      };
    },
    fetchPostsSucceeded: (state, action) => {
      return {
        ...state,
        posts: action.payload.response,
        searchedPosts: action.payload.response,
      };
    },
    fetchPostsFailed: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
      };
    },
    editPost: (state) => {
      return {
        ...state,
      };
    },
    editPostSucceeded: (state, action) => {
      const editedPost = action.payload.editedPost;
      const postsCopy = [
        ...state.posts.filter((post) => post.id !== editedPost.id),
        editedPost,
      ];

      return {
        ...state,
        posts: postsCopy.sort((a, b) => a.id - b.id),
        searchedPosts: postsCopy.sort((a, b) => a.id - b.id),
      };
    },
    editPostFailed: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
      };
    },
    likePost: (state, action) => {
      //This should send an update too but since there's no likes property in the API it would repeat the same function as in edit
      const likedPost = action.payload.post;
      const postsCopy = [
        ...state.posts.filter((post) => post.id !== likedPost.id),
        likedPost,
      ];

      const searchedPostsCopy = [
        ...state.searchedPosts.filter((post) => post.id !== likedPost.id),
        likedPost,
      ];
      return {
        ...state,
        posts: postsCopy.sort((a, b) => a.id - b.id),
        searchedPosts: searchedPostsCopy.sort((a, b) => a.id - b.id),
      };
    },
    searchPosts: (state, action) => {
      const keyword = action.payload.keyword.toUpperCase();
      const postsCopy = [
        ...state.posts.filter((post) =>
          post.title.toUpperCase().includes(keyword)
        ),
      ];

      return {
        ...state,
        searchedPosts: postsCopy,
      };
    },
  },
});

export const {
  fetchPosts,
  fetchPostsSucceeded,
  fetchPostsFailed,
  editPost,
  editPostSucceeded,
  editPostFailed,
  likePost,
  searchPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
