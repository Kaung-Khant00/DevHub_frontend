import { useSelector } from "react-redux";
import NotificationItem from "../NotificationItem";
import Spinner from "../../Common/Spinner";
import { FaBell } from "react-icons/fa6";

const NotificationContainer = () => {
  const { data: notifications, loading } = useSelector((state) => state.notification.fetch);

  return (
    <div>
      <div className="card bg-base-100 p-4">
        <div className="mt-4 space-y-3">
          {!loading && notifications.length === 0 && (
            <div className="text-center py-16">
              <FaBell className="text-5xl mx-auto text-primary/90" />
              <h3 className="mt-6 text-lg font-semibold">You're all caught up</h3>
              <p className="text-sm text-gray-500 mt-2">No notifications right now. Check back later.</p>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <Spinner size="lg" />
            </div>
          )}
          {notifications &&
            notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)}
        </div>
      </div>

      <footer className="mt-6 text-center text-sm text-gray-400">
        <strong>{notifications?.length}</strong> notifications found{" "}
      </footer>
    </div>
  );
};

export default NotificationContainer;
