import axios from "axios";

export const getCurrentUser = () => {
  return axios.get("/users/current");
};

export const deleteCurrentUser = () => {
  return axios.delete("/users/delete");
};

export const getCartData = () => {
  return axios.get("/cart");
};

export const deleteCart = cartId => {
  return axios.delete("/cart", cartId);
};

export const removeOneItem = (cartId, itemId) => {
  return axios.put("/cart", cartId, itemId);
};

export const getOrder = order => {
  return axios.post("/order", order);
};

export const editUserInfo = userInfo => {
  return axios.post("/users/edit", userInfo);
};
