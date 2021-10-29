import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchPosts,
  fetchPostsSucceeded,
  fetchPostsFailed,
  editPost,
  editPostSucceeded,
  editPostFailed,
} from "./slices/postsReducer";

export const fetchPostsFromAPI = async () => {
  const response = await fetch("http://localhost:5000/posts");
  const result = await response.json();
  console.log(result.posts);
  return result.posts;
};

function* fetchPostsSaga() {
  try {
    const posts = yield call(fetchPostsFromAPI);

    yield put(fetchPostsSucceeded({ response: posts }));
  } catch (error) {
    yield put(fetchPostsFailed({ error: error }));
  }
}

export const editPostToAPI = async (post) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
};

function* editPostSaga(action) {
  const post = action.payload.post;
  try {
    const res = yield call(() => editPostToAPI(post));

    console.log(res);
    console.log(post);

    const editedPost = {
      ...post,
      likes: post.likes,
      isLikedByUser: post.isLikedByUser, //likes and isLikedByUser are here because the API does not return them.
    };

    yield put(editPostSucceeded({ editedPost: editedPost }));
  } catch (error) {
    yield put(editPostFailed({ error: error }));
  }
}

export function* watchAPIcall() {
  yield takeLatest(fetchPosts, fetchPostsSaga);
  yield takeLatest(editPost, editPostSaga);
}
