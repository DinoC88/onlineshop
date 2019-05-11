import axios from "axios";

export const addNewProduct = product => {
  return axios.post("/api/product/addproduct", product);
};
