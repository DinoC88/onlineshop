import axios from "axios";

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
