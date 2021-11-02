import { call } from "@redux-saga/core/effects";
import {
  editPostSaga,
  editPostToAPI,
  fetchPostsFromAPI,
  fetchPostsSaga,
} from "./saga";

describe("posts saga", () => {
  it("fetches posts from API successfully", () => {
    const generator = fetchPostsSaga();
    expect(generator.next().value).toEqual(call(fetchPostsFromAPI));
  });
  it("edit post successfully", () => {
    const editedPost = {
      id: 1,
      title: "postTitle",
      body: "postBody",
      userId: 1,
      likes: 2,
      isLikedByUser: true,
    };
    const generator = editPostSaga({
      payload: { post: editedPost },
    });

    expect(generator.next().value).toEqual(call(editPostToAPI, editedPost));
  });
});
