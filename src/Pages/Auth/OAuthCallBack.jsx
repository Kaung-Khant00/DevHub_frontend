import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __SET_TOKEN__ } from "../../Redux/user/userAction";

const OAuthCallBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOauth = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      dispatch(__SET_TOKEN__(token));
      localStorage.setItem("token", token);
      navigate("/feed");
    }
  };
  useEffect(() => {
    handleOauth();
  }, []);
  return (
    <div className="font-bold text-primary text-center w-full flex min-h-screen items-center ">
      Finishing Login...
    </div>
  );
};

export default OAuthCallBack;
