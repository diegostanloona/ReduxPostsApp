import React, { useState } from "react";
import PostsList from "../components/PostsList";

const Posts = () => {
  const [keyword, setKeyword] = useState("");

  let typingTimer; //timer identifier
  const doneTypingInterval = 1000;

  const keywordChangeHandler = (e) => {
    //this function starts the timer everytime the user types, then waits for the time given before fetching
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setKeyword(e.target.value);
    }, doneTypingInterval);
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="p-2 w-1/4 mb-6">
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
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          <PostsList />
        </div>
      </div>
    </section>
  );
};

export default Posts;
