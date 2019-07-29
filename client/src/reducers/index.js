import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import locale from "./locale";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
  auth: authReducer,
  errors: errorReducer,
  locale
});
