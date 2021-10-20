import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const PostItem = (props) => {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="p-4 lg:w-1/3">
      <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">
          {props.post.title}
        </h1>
        <p className="leading-relaxed mb-3">{props.post.body}</p>
        <button
          className="cursor-pointer text-indigo-400 inline-flex items-center hover:opacity-75"
          onClick={() => history.push(`/post/${props.post.id}`)}
        >
          Edit &nbsp;
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
          <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            1.2K
          </span>
          <span
            onClick={() => setIsLiked(!isLiked)}
            className="cursor-pointer hover:opacity-75 text-gray-500 inline-flex items-center leading-none text-sm"
          >
            <svg
              className="w-6 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {/*Displays a filled heart if it is liked, and an empty one if it is not*/}
              {isLiked ? (
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
              ) : (
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
              )}
            </svg>
            {
              props.post
                .userId /*Likes quantity, used userId since the API does not return a 'likes' value and this just needed any number*/
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
