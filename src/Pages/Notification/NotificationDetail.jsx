// NotificationDetailSimple.jsx
import { useEffect } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { NOTIFICATION_TYPES } from "../../Constants/notificationType";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../Services/axios_instance";
import {
  clearDetailNotification,
  deleteNotification,
  fetchDetailNotification,
  setNotificationRead,
} from "../../Redux/user/notificationSlice";
import Spinner from "../../Components/Common/Spinner";
import { toast } from "react-toastify";
import NotificationDataArrayCheckout from "../../Components/Notification/NotificationDataArrayCheckout";

export default function NotificationDetailSimple() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: notification, loading } = useSelector((state) => state.notification.detail);

  useEffect(() => {
    if (notification?.id === id) return;
    dispatch(fetchDetailNotification(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!notification || notification.is_read) return;
    const changeReadStatus = async () => {
      try {
        await api.put(`notifications/${id}/read`);
        dispatch(setNotificationRead(Number(id)));
      } catch (err) {
        console.error("Failed to mark notification read:", err);
      }
    };
    changeReadStatus();
  }, [dispatch, notification, id]);

  const deleteNotificationApi = async (nid) => {
    if (!nid) return;
    try {
      await api.delete(`notifications/${nid}`);
      dispatch(deleteNotification(nid));
      navigate("/notification");
      toast.success("Notification deleted successfully");
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  if (loading || !notification) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner size="lg" />
      </div>
    );
  }

  const meta = NOTIFICATION_TYPES[notification.type] || {};
  const { colorClass = "text-gray-600", Icon = FaInfoCircle, bgClass = "bg-gray-100" } = meta;

  return (
    <div className="p-6 bg-base-100 min-h-screen w-full">
      {/* header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            navigate("/notification");
            dispatch(clearDetailNotification());
          }}
          className="btn btn-ghost btn-square"
          aria-label="Back"
          title="Back">
          <MdOutlineArrowBack className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">Notification</h1>
          <p className="text-sm text-gray-500">Go Back</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`badge ${notification.is_read ? "badge-ghost" : "badge-outline"}`}>
            {notification.is_read ? "Read" : "Unread"}
          </span>
          <button
            onClick={() => deleteNotificationApi(notification?.id)}
            className="btn btn-sm btn-error text-white"
            title="Delete notification"
            aria-label="Delete notification">
            <FaTrashAlt className="w-4 h-4 mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* content */}
      <article className="card bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 flex gap-4">
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${bgClass}`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-slate-800 truncate">{notification.title}</h2>
                <p className="text-xs text-gray-400 mt-1">{notification.created_at}</p>
              </div>
            </div>

            <div className="mt-4 text-gray-700">{notification.message}</div>

            <div className="mt-5 text-xs text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <NotificationDataArrayCheckout notification={notification} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
