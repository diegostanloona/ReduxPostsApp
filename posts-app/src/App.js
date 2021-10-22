import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Posts from "./posts/pages/Posts";
import EditPost from "./posts/pages/EditPost";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  if (posts?.length === 0 || posts === undefined) {
    dispatch({ type: "fetch" });
  }

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Posts />
      </Route>
      <Route path="/post/:postId">
        <EditPost />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  return <Router>{routes}</Router>;
};

export default App;
