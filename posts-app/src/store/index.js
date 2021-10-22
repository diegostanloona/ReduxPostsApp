import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAPIcall } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const initialState = { posts: [] };

const postsReducer = (state = initialState, action) => {
  if (action.type === "fetch") {
    return {
      ...state,
    };
  }

  if (action.type === "fetchSucceeded") {
    return {
      posts: action.response,
    };
  }

  if (action.type === "edit") {
    const editedPost = action.payload.post; //Gets the full edited item from the payload
    const postsCopy = [
      ...state.posts.filter((post) => post.id !== action.payload.post.id), //Copies the filtered state and adds the edited post
      editedPost,
    ];

    return {
      posts: postsCopy.sort((a, b) => a.id - b.id),
    };
  }

  if (action.type === "search") {
    const keyword = action.payload.keyword.toUpperCase();
    const filteredPosts = [
      ...state.posts.filter((post) =>
        post.title.toUpperCase().includes(keyword)
      ),
    ];

    return {
      posts: filteredPosts.sort((a, b) => a.id - b.id),
    };
  }

  return state.posts.sort((a, b) => a.id - b.id); //sort by id
};

const store = createStore(postsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAPIcall);

export default store;
