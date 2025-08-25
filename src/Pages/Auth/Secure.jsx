import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { __GET_USER__ } from "../../Redux/user/userAction";

const Secure = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    dispatch(__GET_USER__());
  }, [token, navigate, dispatch]);
  return <Outlet />;
};

export default Secure;
