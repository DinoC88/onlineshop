import axios from "axios";

export const changeOrderStatus = (status, id) => {
  const data = {
    status,
    id
  };
  return axios.post("/api/order/test", data);
};

export const getTransactionById = transactionId => {
  const id = {
    transactionId
  };
  return axios.post("/api/order/transaction/", id);
};

export const getOrderById = orderid => {
  const id = {
    orderid
  };
  return axios.post("/api/order/orderid", id);
};

export const getOrders = () => {
  return axios.post("/api/order/orders");
};

export const getOrdersByUser = userId => {
  let data = {
    userId
  };
  return axios.post("api/order/userorders", data);
};

export const getTransactions = () => {
  return axios.post("/api/order/transactionlist");
};
export const getToken = () => {
  return axios.get("/api/order/getToken");
};

export const productPurchaseOnline = (
  paymentMethodNonce,
  total,
  info,
  product
) => {
  return axios.post("/api/order/online", paymentMethodNonce);
};

export const productPurchaseDelivery = (info, total, product) => {
  const data = {
    info,
    total,
    product
  };
  return axios.post("/api/order/delivery", data);
};

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

export const editUserInfo = userInfo => {
  return axios.post("/api/users/edit", userInfo);
};

export const getProduct = (filters, sort, limit, currentPage) => {
  const data = {
    filters,
    sort,
    limit,
    currentPage
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
