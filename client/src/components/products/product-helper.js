import axios from "axios";

export const getProduct = filters => {
  return axios.post(`/product/list`, filters);
};

export const sortProductsByName = filters => {
  return axios.post(`/product`, filters);
};

export const getProductById = productId => {
  return axios.get("/product/" + productId);
};

export const addProductToCart = product => {
  return axios.post("/cart", product);
};
