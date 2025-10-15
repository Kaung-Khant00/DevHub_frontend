import { BsThreeDotsVertical } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import Spinner from "../Common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setReportingPost } from "../../Redux/report/reportSlice";
import { useNavigate } from "react-router-dom";

const PostCardAction = ({ authUser, DeletePostApi, EditPostApi, user, FollowUserApi, followed, post }) => {
  const followLoading = useSelector((state) => state.post.follow.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function ReportPostApi() {
    dispatch(setReportingPost(post));
    navigate(`/report/post/${post.id}`);
  }
  /*   async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  } */
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
        {user?.id === authUser?.id ? (
          <li onClick={EditPostApi}>
            <a>Edit Post</a>
          </li>
        ) : (
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
        {user?.id === authUser?.id ? (
          <li>
            <div onClick={DeletePostApi} className="text-red-600 hover:bg-red-500 hover:text-white">
              <FiTrash2 /> Delete this post
            </div>
          </li>
        ) : (
          <li>
            <div onClick={ReportPostApi} className="text-red-600 hover:bg-red-500 hover:text-white">
              <GoReport />
              Report
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostCardAction;
