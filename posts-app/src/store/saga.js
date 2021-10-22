import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

const getData = () => {
  return fetch("http://localhost:5000/posts")
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => {
      console.log(error);
    });
};

function* fetchPosts() {
  try {
    const response = yield call(getData, {});

    yield put({ type: "fetchSucceeded", response: response.posts });
  } catch (error) {
    yield put({ type: "fetchFailed", error });
  }
}

export function* watchAPIcall() {
  yield takeLatest("fetch", fetchPosts);
}
