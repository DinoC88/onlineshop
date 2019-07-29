import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import { loginSubmit, registerSubmit } from "../utils/requestManager";
import decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) => dispatch => {
  registerSubmit(userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logginUser = (data, history) => dispatch => {
  loginSubmit(data)
    .then(user => {
      localStorage.setItem("isAdmin", user.data.userInfo.isAdmin);
      // Take token from data
      const { token } = user.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
