import { FaBell, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { NOTIFICATION_TYPES } from "../../Constants/notificationType";
import { useNavigate } from "react-router-dom";
import { deleteNotification, setDetailNotification } from "../../Redux/user/notificationSlice";
import { useDispatch } from "react-redux";
import { api } from "../../Services/axios_instance";

function NotificationItem({ notification }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meta = NOTIFICATION_TYPES[notification.type] || FaBell;
  const Icon = meta.Icon;

  const deleteNotificationApi = async (id) => {
    try {
      const response = await api.delete(`notifications/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    dispatch(deleteNotification(id));
  };
  return (
    <div
      className={`flex gap-4 p-4 items-start rounded-lg border ${
        notification.is_read ? "bg-base-200/50 border-base-200" : "bg-white shadow-md border-base-300"
      }`}>
      <div className="flex-shrink-0 mt-1">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center ${
            notification.is_read ? "bg-gray-100" : "bg-primary/10"
          }`}>
          <Icon size={30} className={` ${notification.is_read ? "text-gray-400" : meta.colorClass}`} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex gap-1 items-center">
              <h3 className="text-lg font-semibold leading-tight">{notification.title}</h3>
              {!notification.is_read && <div className="badge badge-soft badge-primary">New</div>}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {notification.message.length > 100 ? notification.message.slice(0, 100) + "..." : notification.message}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">{notification.created_at}</p>
            <div className="mt-2 flex gap-2 justify-end">
              {/* <button className={`btn btn-sm ${notification.is_read ? "btn-outline" : "btn-soft"} btn-primary`}>
                {notification.is_read ? <FaEnvelope size={16} /> : <FaEnvelopeOpen size={16} />}
                {notification.is_read ? "Mark Unread" : "Mark Read"}
              </button> */}
              <button
                onClick={() => {
                  deleteNotificationApi(notification.id);
                }}
                className="btn btn-sm btn-soft btn-error">
                Delete
              </button>
              <button
                onClick={() => {
                  dispatch(setDetailNotification(notification.id));
                  navigate(`${notification.id}`);
                }}
                className="btn btn-sm btn-soft btn-primary">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
