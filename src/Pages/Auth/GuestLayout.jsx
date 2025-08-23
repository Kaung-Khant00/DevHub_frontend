import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Helleo mate");
    if (token) {
      navigate("/home");
    }
  }, [token]);
  return (
    <div className="bg-gray-50 font-inter">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
