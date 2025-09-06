import { useState } from "react";
import { FaCheck, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "../Common/Spinner";

function FollowButton({ followUserApi }) {
  const loading = useSelector((state) => state.post.follow.loading);
  const [followed, setFollowed] = useState();
  const followUser = () => {
    followUserApi();
    setFollowed((s) => !s);
  };
  return (
    <button
      type="button"
      className={`btn ${
        followed ? "btn-primary" : "btn-outline btn-primary"
      } btn-sm w-full flex items-center justify-center gap-2`}
      onClick={followUser}
      disabled={loading}

      // replace onClick with your follow/unfollow handler when ready
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <>{followed ? <FaCheck /> : <FaUserPlus />}</>
      )}{" "}
      <span className="text-xs">{followed ? "Following" : "Follow"}</span>
    </button>
  );
}
export default FollowButton;
