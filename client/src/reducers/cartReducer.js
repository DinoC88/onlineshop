import { GET_CART, ADD_CART, REMOVE_PRODUCT_CART } from "../actions/types";

const initialState = {
  cartItems: [],
  cartId: "",
  cart: {},
  isLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cartItems: action.payload.items,
        isLoading: false,
        cart: action.payload,
        cartId: action.payload._id,
        total: action.payload.items
          ? action.payload.items.reduce(
              (acc, item) => (acc += item.product.price * item.quantity),
              0
            )
          : 0
      };
    case REMOVE_PRODUCT_CART:
      return {
        ...state,
        isLoading: true
      };
    case ADD_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
}
