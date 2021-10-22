import React from "react";
import { useSelector } from "react-redux";

import PostItem from "./PostItem";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  console.log(posts);

  return (
    <>
      {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      {!posts && <h2 onClick={() => console.log(posts)}>Loading...</h2>}
    </>
  );
};

export default PostsList;
