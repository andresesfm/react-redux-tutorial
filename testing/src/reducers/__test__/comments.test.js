import commentsReducer from "reducers/comments";
import { SAVE_COMMENT } from "actions/types";

it("Handles actions of type save comment", () => {
  const action = {
    type: SAVE_COMMENT,
    payload: "New comment"
  };

  const newState = commentsReducer([], action);

  expect(newState).toEqual(["New comment"]);
});

it("Doesn't fail if passed any other type", () => {
  const newState = commentsReducer([], { type: "test" });

  expect(newState).toEqual([]);
});
