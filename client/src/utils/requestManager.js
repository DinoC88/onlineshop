import axios from "axios";

export const addNewProduct = product => {
  return axios.post("/api/product/addproduct", product);
};

export const getCurrentUser = () => {
  return axios.get("/api/users/current");
};

export const deleteCurrentUser = () => {
  return axios.delete("/api/users/delete");
};

export const getCartData = userid => {
  return axios.get("/api/cart", userid);
};

export const deleteCart = cartId => {
  return axios.delete("/api/cart", cartId);
};

export const removeOneItem = (cartId, itemId) => {
  return axios.put("/api/cart", cartId, itemId);
};

export const getOrder = order => {
  return axios.post("/api/order", order);
};

export const editUserInfo = userInfo => {
  return axios.post("/api/users/edit", userInfo);
};

export const getProduct = (filters, sort, limit) => {
  const data = {
    filters,
    sort,
    limit
  };
  return axios.post(`/api/product/list`, data);
};

export const getProductById = productId => {
  return axios.get("/api/product/" + productId);
};

export const addProductToCart = product => {
  return axios.post("/api/cart", product);
};

export const deleteProduct = nameData => {
  return axios.delete("/api/product/delete", { data: { name: nameData } });
};

export const registerSubmit = newUser => {
  return axios.post("/api/users/register", newUser);
};

export const loginSubmit = user => {
  return axios.post("/api/users/login", user);
};
