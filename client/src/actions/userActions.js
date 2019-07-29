import { USER_LOADING, GET_CURRENT_USER } from "./types";
import {
  getCurrentUser,
  deleteCurrentUser,
  editUserInfo
} from "../utils/requestManager";

export const fetchCurrentUser = () => dispatch => {
  dispatch(setUserInfoLoading());
  getCurrentUser().then(user => {
    dispatch({
      type: GET_CURRENT_USER,
      payload: user.data
    });
  });
};

export const deleteCurrUser = () => dispatch => {
  deleteCurrentUser();
};

export const changeUserInfo = (data, history) => dispatch => {
  editUserInfo(data).then(res => {
    history.push("/users/current");
  });
};

//User info loading
export const setUserInfoLoading = () => {
  return {
    type: USER_LOADING
  };
};
