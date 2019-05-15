import axios from "axios";

export const getProduct = (filters, sort) => {
  const data = {
    filters,
    sort
  };
  return axios.post(`/api/product/list`, data);
};

export const getProductById = productId => {
  return axios.get("/api/product/" + productId);
};

export const addProductToCart = product => {
  return axios.post("/api/cart", product);
};
