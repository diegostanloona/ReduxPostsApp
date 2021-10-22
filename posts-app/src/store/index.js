import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAPIcall } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const initialState = { posts: [], searchedPosts: [], error: null };

const postsReducer = (state = initialState, action) => {
  if (action.type === "fetch") {
    return {
      ...state,
    };
  }

  if (action.type === "fetchSucceeded") {
    return {
      ...state,
      posts: action.response,
      searchedPosts: action.response,
    };
  }

  if (action.type === "edit") {
    return {
      ...state,
    };
  }

  if (action.type === "editSucceeded") {
    const editedPost = action.editedPost;
    const postsCopy = [
      ...state.posts.filter((post) => post.id !== editedPost.id),
      editedPost,
    ];

    return {
      ...state,
      posts: postsCopy.sort((a, b) => a.id - b.id),
      searchedPosts: postsCopy.sort((a, b) => a.id - b.id),
    };
  }

  if (action.type === "likePost") {
    //This should send an update too but since there's no likes property in the API it would repeat the same function as in edit
    const likedPost = action.payload.post;
    const postsCopy = [
      ...state.posts.filter((post) => post.id !== likedPost.id),
      likedPost,
    ];
    return {
      ...state,
      posts: postsCopy.sort((a, b) => a.id - b.id),
      searchedPosts: postsCopy.sort((a, b) => a.id - b.id),
    };
  }

  if (action.type === "search") {
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
  }

  return {
    ...state,
    posts: state.posts.sort((a, b) => a.id - b.id),
  };
};

const store = createStore(postsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAPIcall);

export default store;
