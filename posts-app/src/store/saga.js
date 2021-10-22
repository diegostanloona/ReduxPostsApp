import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* fetchPosts() {
  try {
    const response = yield call(
      () =>
        fetch("http://localhost:5000/posts")
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          }),
      {}
    );

    yield put({ type: "fetchSucceeded", response: response.posts });
  } catch (error) {
    yield put({ type: "fetchFailed", error });
  }
}

function* editPost(action) {
  const post = action.payload.post;
  try {
    const response = yield call(
      () =>
        fetch("https://jsonplaceholder.typicode.com/posts/1", {
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
        }).then((response) => response.json()),
      {}
    );

    const editedPost = {
      ...post,
      likes: post.likes,
      isLikedByUser: post.isLikedByUser, //likes and isLikedByUser are here because the API does not return them.
    };

    yield put({ type: "editSucceeded", editedPost: editedPost });
  } catch (error) {
    yield put({ type: "editFailed", error });
  }
}

export function* watchAPIcall() {
  yield takeLatest("fetch", fetchPosts);
  yield takeLatest("edit", editPost);
}
