import { AUTH_USER, AUTH_ERROR, AUTH_SIGNOUT } from "./types";
import axios from "axios";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Please check your user name and password"
    });
  }
};

export const signout = () => {
  localStorage.setItem("token", null);
  return { type: AUTH_SIGNOUT };
};
