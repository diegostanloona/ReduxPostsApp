import React, { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import { useSelector, useDispatch } from "react-redux";

const Posts = () => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const searchedPosts = useSelector((state) => state.searchedPosts);

  let typingTimer; //timer identifier
  const doneTypingInterval = 1000;

  const keywordChangeHandler = (e) => {
    //this function starts the timer everytime the user types, then waits for the time given before fetching
    clearTimeout(typingTimer);
    setKeyword(e.target.value);
    typingTimer = setTimeout(() => {
      dispatch({
        type: "search",
        payload: {
          keyword: e.target.value,
        },
      });
    }, doneTypingInterval);
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-6">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Search for title
            </label>
            <input
              value={keyword}
              onChange={keywordChangeHandler}
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <h6 className="text-sm text-gray-600">
              Search results: {searchedPosts.length}
            </h6>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          <PostsList posts={searchedPosts} />
        </div>
      </div>
    </section>
  );
};

export default Posts;
