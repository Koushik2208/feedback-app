import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <Outlet />
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
};

export default ProtectedRoute;
