import axios from "axios";

export const getProduct = filters => {
  return axios.post(`/api/product/list`, filters);
};

export const getProductBySearch = search => {
  return axios.post(`/api/product/search`, search);
};
export const sortProductsByAlphabet = filters => {
  return axios.post(`/api/product`, filters);
};

export const getProductById = productId => {
  return axios.get("/api/product/" + productId);
};

export const addProductToCart = product => {
  return axios.post("/api/cart", product);
};
