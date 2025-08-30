import { useState } from "react";
import { FaCheck, FaUserPlus } from "react-icons/fa";

function FollowButton() {
  const [followed, setFollowed] = useState(false);

  return (
    <button
      type="button"
      className={`btn ${
        followed ? "btn-primary" : "btn-outline btn-primary"
      } btn-sm w-full flex items-center justify-center gap-2`}
      onClick={() => setFollowed((s) => !s)}
      aria-pressed={followed}
      // replace onClick with your follow/unfollow handler when ready
    >
      {followed ? <FaCheck /> : <FaUserPlus />}{" "}
      <span className="text-xs">{followed ? "Following" : "Follow"}</span>
    </button>
  );
}
export default FollowButton;
