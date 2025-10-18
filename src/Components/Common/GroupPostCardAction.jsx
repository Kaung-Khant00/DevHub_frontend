import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import Spinner from "../Common/Spinner";
import { followUser } from "../../Redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupPost, followUserChangeInGroupPost } from "../../Redux/group/groupPostsSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const GroupPostCardAction = ({ authUser, user, followed, post }) => {
  const dispatch = useDispatch();
  const followLoading = useSelector((state) => state.post.follow.loading);
  const deleteLoading = useSelector((state) => state.groupPost.deleteLoading);
  function FollowUserApi() {
    if (post.user?.id) {
      dispatch(followUser({ userId: user.id }));
      dispatch(followUserChangeInGroupPost(post));
    }
  }
  async function deletePostApi() {
    try {
      await dispatch(deleteGroupPost(post.id)).unwrap();
      toast.success("Group Post Deleted");
    } catch {
      toast.error("Failed to Delete post");
    }
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle m-1">
        <BsThreeDotsVertical size={20} />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
        {/* <li>
                <a>Save Post</a>
              </li> 
              <li>
                <a>Unfollow User</a>
              </li> */}
        {user?.id !== authUser?.id && (
          <li>
            <div onClick={FollowUserApi} className={`${followed ? "text-red-600" : ""}`}>
              {followLoading ? <Spinner size="sm" /> : <>{followed ? <HiOutlineUserMinus /> : <HiOutlineUserAdd />}</>}
              {followed ? "Unfollow" : "Follow"} User
            </div>
          </li>
        )}

        {/*         <li>
          <div onClick={copyLink}>
            <FaLink />
            Copy Link
          </div>
        </li> */}
        {/*         <li>
          <a>Share</a>
        </li> */}
        {user?.id === authUser?.id && (
          <>
            {/*            <li>
              <Link to={`post/${post.id}/edit`}>Edit Post</Link>
            </li> */}
            <li>
              <div onClick={deletePostApi} className="text-red-600 hover:bg-red-500 hover:text-white">
                {deleteLoading ? <Spinner /> : <FiTrash2 />} Delete this post
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default GroupPostCardAction;
