import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "../../Redux/user/userSlice";

const Secure = () => {
  const { token, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    if (!user) {
      dispatch(fetchUser());
    }
  }, [token, navigate, dispatch, user]);
  if (!token)
    return (
      <div className=" min-h-screen w-full flex justify-center items-center">
        <div className="text-primary text-3xl font-bold pe-1">LOADING</div>
        <span className="loading loading-dots loading-lg text-primary mt-2"></span>
      </div>
    );
  return <Outlet />;
};

export default Secure;
