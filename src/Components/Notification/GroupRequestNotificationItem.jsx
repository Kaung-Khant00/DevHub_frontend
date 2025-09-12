import { FaRegImage, FaTags, FaTrash } from "react-icons/fa";
import { StatusBadge } from "./StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupRequest } from "../../Redux/user/notificationSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../Common/Spinner";

const GroupRequestNotificationItem = ({ notification }) => {
  const dispatch = useDispatch();
  const deleteLoading = useSelector((state) => state.notification.groupRequest.deleteLoading);

  const deleteGroupCreationRequestApi = () => {
    try {
      dispatch(deleteGroupRequest(notification.id));
      toast.success("Group request deleted successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <li className="flex gap-4 p-4 rounded-lg bg-white shadow-sm my-3">
      {/* image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 rounded-md bg-base-200 flex items-center justify-center overflow-hidden">
          {notification?.image_url ? (
            <img src={notification.image_url} alt={notification.name} className="object-cover w-full h-full" />
          ) : (
            <FaRegImage className="text-3xl text-gray-400" />
          )}
        </div>
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold truncate">{notification?.name}</h2>
              <StatusBadge status={notification?.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notification?.description}</p>

            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FaTags className="inline" />{" "}
                <span>{notification?.tags?.length > 0 ? notification.tags.join(", ") : notification.tags || "—"}</span>
              </div>
              <span className="mx-1">•</span>
              <div>{notification?.created_at}</div>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-end gap-2">
            <button
              onClick={deleteGroupCreationRequestApi}
              className={`btn btn-sm btn-error flex items-center gap-2 text-white`}>
              {deleteLoading ? <Spinner size="sm" /> : <FaTrash />}
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>

            <Link to={`/group/requests/${notification.id}`} className="btn btn-sm btn-ghost">
              View
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GroupRequestNotificationItem;
