import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/feed");
    }
  }, [navigate, token]);
  return (
    <div className="bg-gray-50 font-inter">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
