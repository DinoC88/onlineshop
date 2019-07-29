import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_LOADING,
  GET_ERRORS
} from "./types";
import {
  getProductById,
  getProduct,
  deleteProduct,
  addNewProduct
} from "../utils/requestManager";

export const fetchProduct = id => dispatch => {
  dispatch(setProductLoading());
  getProductById(id).then(productData => {
    dispatch({
      type: GET_PRODUCT,
      payload: productData.data
    });
  });
};

export const fetchProducts = (
  filters,
  sort,
  limit,
  currentPage
) => dispatch => {
  dispatch(setProductLoading());
  getProduct(filters, sort, limit, currentPage).then(productData => {
    dispatch({
      type: GET_PRODUCTS,
      payload: productData.data
    });
  });
};

export const deleteProd = data => dispatch => {
  deleteProduct(data).then(productData => {
    dispatch({
      type: GET_PRODUCTS,
      payload: productData.data
    });
  });
};

export const addNewProd = (data, history) => dispatch => {
  addNewProduct(data)
    .then(() => {
      dispatch(fetchProducts());
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Product loading
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
