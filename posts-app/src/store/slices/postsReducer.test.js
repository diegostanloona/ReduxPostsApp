import postsReducer, {
  initialState,
  fetchPosts,
  fetchPostsSucceeded,
  fetchPostsFailed,
  editPost,
  editPostSucceeded,
  editPostFailed,
  likePost,
  searchPosts,
} from "./postsReducer";

describe("posts slice", () => {
  it("should return the initial state on first run as well as fetching posts", () => {
    const nextState = initialState;
    const result = postsReducer(initialState, fetchPosts());

    expect(result).toEqual(nextState);
  });
  it("should fetch the posts on fetchSucceeded", () => {
    const nextState = {
      ...initialState,
      posts: [{ title: "postTitle" }],
      searchedPosts: [{ title: "postTitle" }],
    };
    const result = postsReducer(
      initialState,
      fetchPostsSucceeded({ response: [{ title: "postTitle" }] })
    );

    expect(result).toEqual(nextState);
  });
  it("should return an error on fetchFailed", () => {
    const nextState = {
      ...initialState,
      error: "Test Error",
    };
    const result = postsReducer(
      initialState,
      fetchPostsFailed({ error: "Test Error" })
    );

    expect(result).toEqual(nextState);
  });
  it("should return initial state after editing", () => {
    const nextState = initialState;
    const result = postsReducer(initialState, editPost());

    expect(result).toEqual(nextState);
  });
  it("should return the updated post arrays on editPostSuceeded", () => {
    const state = { posts: [{ id: 1, title: "testTitle" }] };
    const nextState = {
      posts: [{ id: 1, title: "editedTitle" }],
      searchedPosts: [{ id: 1, title: "editedTitle" }],
    };

    const result = postsReducer(
      state,
      editPostSucceeded({ editedPost: { id: 1, title: "editedTitle" } })
    );

    expect(result).toEqual(nextState);
  });
  it("should return an error on editPostFailed", () => {
    const nextState = {
      ...initialState,
      error: "Test Error",
    };
    const result = postsReducer(
      initialState,
      editPostFailed({ error: "Test Error" })
    );

    expect(result).toEqual(nextState);
  });
  it("should return the updated post arrays on likePost", () => {
    const state = {
      ...initialState,
      posts: [{ id: 1, likes: 10 }],
      searchedPosts: [{ id: 1, likes: 10 }],
    };
    const nextState = {
      ...initialState,
      posts: [{ id: 1, likes: 11 }],
      searchedPosts: [{ id: 1, likes: 11 }],
    };

    const result = postsReducer(
      state,
      likePost({ post: { id: 1, likes: 11 } })
    );

    expect(result).toEqual(nextState);
  });
  it("should return the searchedPosts array with the posts containing the keyword", () => {
    const state = {
      ...initialState,
      posts: [
        { id: 1, title: "testTitle" },
        { id: 2, title: "LoremIpsum" },
      ],
    };
    const nextState = {
      ...state,
      searchedPosts: [{ id: 1, title: "testTitle" }],
    };

    const keyword = "estti";

    const result = postsReducer(state, searchPosts({ keyword: keyword }));

    expect(result).toEqual(nextState);
  });
});
