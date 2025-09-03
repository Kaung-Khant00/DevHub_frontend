import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import Spinner from "../Common/Spinner";
import { useSelector } from "react-redux";

const PostCardAction = ({
  authUser,
  DeletePostApi,
  EditPostApi,
  user,
  FollowUserApi,
  followed,
}) => {
  const followLoading = useSelector((state) => state.post.follow.loading);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle m-1">
        <BsThreeDotsVertical size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {/* <li>
                <a>Save Post</a>
              </li> 
              <li>
                <a>Unfollow User</a>
              </li> */}
        {user?.id === authUser?.id ? (
          <li onClick={EditPostApi}>
            <a>Edit Post</a>
          </li>
        ) : (
          <li>
            <div
              onClick={FollowUserApi}
              className={`${followed ? "text-red-600" : ""}`}
            >
              {followLoading ? (
                <Spinner size="sm" />
              ) : (
                <>{followed ? <HiOutlineUserMinus /> : <HiOutlineUserAdd />}</>
              )}
              {followed ? "Unfollow" : "Follow"} User
            </div>
          </li>
        )}

        <li>
          <a>
            <FaLink />
            Copy Link
          </a>
        </li>
        <li>
          <a>Share</a>
        </li>
        {user?.id === authUser?.id ? (
          <li>
            <div
              onClick={DeletePostApi}
              className="text-red-600 hover:bg-red-500 hover:text-white"
            >
              <FiTrash2 /> Delete this post
            </div>
          </li>
        ) : (
          <li>
            <a className="text-red-600 hover:bg-red-500 hover:text-white">
              <GoReport />
              Report
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostCardAction;
