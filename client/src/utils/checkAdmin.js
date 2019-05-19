import decode from "jwt-decode";

const checkAdmin = () => {
  const admin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("jwtToken");

  if (admin === "0" || !token) {
    return false;
  }
  try {
    // { exp: 12903819203 }
    const { exp } = decode(token);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};
export default checkAdmin;
