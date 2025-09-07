import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAdminUser } from "../../Redux/admin/admin.user.js";
import AdminLoading from "../Admin/AdminLoading.jsx";

const SecureAdmin = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.admin.user);
  useEffect(() => {
    if (!token) {
      window.location.href = "/auth/login";
    }
    if (user.data?.role === "user" || localStorage.getItem("role") === "user") {
      window.location.href = "/feed";
    }
    if (!user.data && localStorage.getItem("role") === "admin") {
      dispatch(fetchAdminUser());
    }
  }, [dispatch, token, user.data]);

  if (!token || localStorage.getItem("role") === "admin") {
    return <AdminLoading />;
  }

  return <Outlet />;
};

export default SecureAdmin;
