import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification, removeReadNotification, setNotificationAllRead } from "../../Redux/user/notificationSlice";
import NotificationContainer from "../../Components/Notification/NotificationContainer";
import { api } from "../../Services/axios_instance";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ReturnBackButton from "../../Components/Common/ReturnBackButton";

export default function NotificationPage() {
  const notifications = useSelector((state) => state.notification.fetch.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(notifications.length === 0);
    if (notifications.length === 0) {
      dispatch(fetchNotification());
    }
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const response = await api.put(`notifications/all/read`);
      console.log(response);
      dispatch(setNotificationAllRead());
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearRead = async () => {
    try {
      const response = await api.delete(`notifications/all/read`);
      console.log(response);
      dispatch(removeReadNotification());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 w-full">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <ReturnBackButton defaultBackTo="/feed" except="/notification" />
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={handleMarkAllRead} className="btn btn-sm btn-primary">
            Mark all read
          </button>
          <button onClick={handleClearRead} className="btn btn-sm btn-ghost">
            Clear read
          </button>
        </div>
      </header>

      <NotificationContainer />
    </div>
  );
}
