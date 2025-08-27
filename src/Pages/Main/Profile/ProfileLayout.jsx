import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { __GET_USER_PROFILE__ } from "../../../Redux/user/userAction";
import { useDispatch } from "react-redux";

const ProfileLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__GET_USER_PROFILE__());
  }, [dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
