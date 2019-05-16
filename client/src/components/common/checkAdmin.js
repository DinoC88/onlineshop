const checkAdmin = () => {
  const admin = localStorage.getItem("isAdmin");
  if (admin === "1") {
    return true;
  } else {
    return false;
  }
};
export default checkAdmin;
