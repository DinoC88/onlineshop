import { GET_CART, ADD_CART, REMOVE_PRODUCT_CART } from "./types";
import {
  getCartData,
  addProductToCart,
  removeOneItem,
  deleteCart
} from "../utils/requestManager";

export const fetchCart = userId => dispatch => {
  getCartData(userId).then(cart => {
    dispatch({
      type: GET_CART,
      payload: cart.data
    });
  });
};

export const addCart = data => dispatch => {
  addProductToCart(data)
    .then(cart => {
      dispatch({
        type: ADD_CART,
        payload: cart
      });
    })
    .then(() => {
      dispatch(fetchCart());
    });
};

export const removeProductCart = (cartId, itemId) => dispatch => {
  removeOneItem(cartId, itemId)
    .then(() => {
      dispatch({
        type: REMOVE_PRODUCT_CART
      });
    })
    .then(() => {
      dispatch(fetchCart());
    });
};

export const delCart = cartId => dispatch => {
  deleteCart(cartId).then(cart =>
    dispatch({
      type: GET_CART,
      payload: cart.data
    })
  );
};
