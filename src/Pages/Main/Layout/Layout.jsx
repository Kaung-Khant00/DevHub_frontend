import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Helleo mate");
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
