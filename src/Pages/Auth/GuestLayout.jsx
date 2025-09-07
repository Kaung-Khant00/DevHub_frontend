import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      if (localStorage.getItem("role") === "admin") {
        navigate("/admin");
      } else {
        navigate("/feed");
      }
    }
  }, [navigate, token]);
  return (
    <div className="bg-gray-50">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
