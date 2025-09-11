import { FaRegImage, FaTags, FaTrash } from "react-icons/fa";
import { StatusBadge } from "./StatusBadge";

const GroupRequestNotificationItem = ({ notification, handleDelete }) => {
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
              <span className="mx-2">•</span>
              <div>{notification?.created_at}</div>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-end gap-2">
            <button
              onClick={() => handleDelete(notification?.id)}
              className={`btn btn-sm btn-error flex items-center gap-2 text-white`}>
              <FaTrash />
              Delete
            </button>

            <button className="btn btn-sm btn-ghost">View</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GroupRequestNotificationItem;
