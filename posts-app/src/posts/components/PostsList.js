import React from "react";
import { useSelector } from "react-redux";

import PostItem from "./PostItem";

const PostsList = (props) => {
  return (
    <>
      {props.posts &&
        props.posts.map((post) => <PostItem post={post} key={post.id} />)}
      {!props.posts && <h2>Loading...</h2>}
    </>
  );
};

export default PostsList;
