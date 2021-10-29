import { combineReducers } from "redux";

import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  postsReducer: postsReducer,
});

export default rootReducer;
