import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const EditPost = () => {
  const dispatch = useDispatch();

  const postId = useParams().postId;
  const history = useHistory();

  const post = useSelector(
    (state) => state.posts.filter((post) => post.id + "" === postId)[0]
  );

  const [title, setTitle] = useState(post === undefined ? "" : post.title);
  const [body, setBody] = useState(post === undefined ? "" : post.body);

  const editPostHandler = () => {
    dispatch({
      type: "edit",
      payload: {
        post: {
          ...post,
          title,
          body,
        },
      },
    });
    history.push("/");
  };

  const cancelEditPostHandler = () => {
    history.push("/");
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Edit Post
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400"
                >
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={post === undefined}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-400"
                >
                  Description
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  disabled={post === undefined}
                  id="message"
                  name="message"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <button
                onClick={editPostHandler}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Edit
              </button>
            </div>
            <div className="p-2 w-1/2">
              <button
                onClick={cancelEditPostHandler}
                className="flex mx-auto text-white bg-indigo-300 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-400 rounded text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
