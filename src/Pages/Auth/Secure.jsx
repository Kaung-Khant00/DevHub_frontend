import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "../../Redux/user/userSlice";

const Secure = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    dispatch(fetchUser());
  }, [token, navigate, dispatch]);
  return <Outlet />;
};

export default Secure;
