import React from "react";
import { mount } from "enzyme";

import CommentList from "components/CommentList";
import Root from "Root";

let wrapped;
let initialState;

beforeEach(() => {
  initialState = {
    comments: ["Comment 1", "comment 2"]
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("Creates one li per comment", () => {
  expect(wrapped.find("li").length).toEqual(2);
});

it("Text from each comment is visible", () => {
  const rendered = wrapped.render().text();
  initialState.comments.forEach(comment => {
    expect(rendered).toContain(comment);
  });
});
