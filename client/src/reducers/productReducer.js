import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_LOADING } from "../actions/types";

const initialState = {
  product: [],
  productName: "",
  productId: "",
  products: [],
  totalPages: 0,
  totalProducts: 0,
  isLoading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        productName: action.payload.name,
        productId: action.payload._id,
        isLoading: false
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        totalProducts: action.payload.totalProducts,
        isLoading: false
      };
    default:
      return state;
  }
}
