import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PostItem from "./PostItem";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  console.log(posts);

  if (posts?.length === 0 || posts === undefined) {
    dispatch({ type: "fetch" });
  }

  return (
    <>
      {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      {!posts && <h2 onClick={() => console.log(posts)}>Loading...</h2>}
    </>
  );
};

export default PostsList;
