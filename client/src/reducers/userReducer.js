import { USER_LOADING, GET_CURRENT_USER } from "../actions/types";

const initialState = {
  userInfo: {},
  userId: "",
  isLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_CURRENT_USER:
      return {
        ...state,
        userInfo: action.payload,
        userId: action.payload.id,
        isLoading: false
      };
    default:
      return state;
  }
}
