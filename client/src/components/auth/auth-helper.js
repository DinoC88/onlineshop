import axios from "axios";

export const registerSubmit = newUser => {
  return axios.post("/api/users/register", newUser);
};

export const loginSubmit = user => {
  return axios.post("/api/users/login", user);
};
