import axios from "axios";

export const registerSubmit = newUser => {
  return axios.post("/users/register", newUser);
};

export const loginSubmit = user => {
  return axios.post("/users/login", user);
};
