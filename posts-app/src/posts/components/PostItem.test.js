import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import PostItem from "./PostItem";

describe("post item", () => {
  const props = {
    post: {
      id: 1,
      title: "test_title",
      body: "test_body",
      likes: 20,
      isLikedByUser: true,
    },
  };

  const wrap = (props) =>
    render(
      <Provider store={store}>
        <PostItem {...props} />
      </Provider>
    );

  it("post item renders", () => {
    const component = wrap(props);

    const title = component.queryByText(props.post.title);
    const body = component.queryByText(props.post.body);
    const likes = component.queryByText(props.post.likes, {
      exact: false,
    });

    expect(title).toBeTruthy();
    expect(body).toBeTruthy();
    expect(likes).toBeTruthy();
  });
});
