import axios from "axios";

export const getProduct = filters => {
  return axios.post(`/product/list`, filters);
};

export const getProductBySearch = search => {
  return axios.post(`/product/search`, search);
};
export const sortProductsByAlphabet = filters => {
  return axios.post(`/product`, filters);
};

export const getProductById = productId => {
  return axios.get("/product/" + productId);
};

export const addProductToCart = product => {
  return axios.post("/cart", product);
};
