// UserGroupRequests.jsx
import { useEffect } from "react";
import { FaArrowLeft, FaRegImage } from "react-icons/fa";
import GroupRequestNotificationItem from "../../Components/Notification/GroupRequestNotificationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupRequest } from "../../Redux/user/notificationSlice";
import { toast } from "react-toastify";

export default function UserGroupCreationRequestPage() {
  const { data, loading } = useSelector((state) => state.notification.groupRequest);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    dispatch(fetchGroupRequest());
  };

  const refreshRequest = async () => {
    try {
      await dispatch(fetchGroupRequest()).unwrap();
      toast.success("Group requests refreshed successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    if (data.length === 0) {
      fetchRequests();
    }
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen w-full">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <Link to={"/group"} className="btn btn-ghost btn-square" aria-label="Back" title="Back">
            <FaArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-semibold">My Group Requests</h1>
        </div>

        <div>
          <button className="btn btn-sm btn-ghost" onClick={refreshRequest} aria-label="Refresh requests">
            Refresh
          </button>
          <Link to={"/group"} className="btn btn-sm btn-ghost">
            Back
          </Link>
        </div>
      </header>

      <div className="card p-4 bg-base-100">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="loading loading-spinner loading-lg" aria-hidden="true" />
          </div>
        ) : data.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <FaRegImage className="mx-auto text-4xl mb-3 text-primary/80" />
            <div className="text-lg font-medium">No requests yet</div>
            <div className="text-sm mt-2">Submit a new group creation request and it will appear here.</div>
          </div>
        ) : (
          <ul>
            {data.map((notification) => (
              <GroupRequestNotificationItem key={notification.id} notification={notification} />
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-6 text-sm text-gray-500 text-center">
        Showing <strong>{data?.length}</strong> requests
      </footer>
    </div>
  );
}
