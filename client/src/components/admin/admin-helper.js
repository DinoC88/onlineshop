import axios from "axios";

export const addNewProduct = product => {
  return axios.post("/product/addproduct", product);
};
