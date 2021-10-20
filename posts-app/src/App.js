import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Posts from "./posts/pages/Posts";
import EditPost from "./posts/pages/EditPost";

import "./index.css";

const App = () => {
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
