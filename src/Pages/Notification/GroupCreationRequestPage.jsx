// UserGroupRequests.jsx
import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import GroupRequestNotificationItem from "../../Components/Notification/GroupRequestNotificationItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupRequest } from "../../Redux/user/notificationSlice";

const SAMPLE_REQUESTS = [
  {
    id: 1,
    name: "Cycling Club",
    description: "A group for cycling enthusiasts to share routes and events.",
    image: null,
    status: "approved",
    tags: ["sports", "outdoors"],
    created_at: "2025-09-08",
  },
  {
    id: 2,
    name: "Tech Hub",
    description: "Discuss new technologies, frameworks and trends.",
    image: null,
    status: "pending",
    tags: ["programming", "web"],
    created_at: "2025-09-07",
  },
  {
    id: 3,
    name: "Study Group",
    description: "Prepare together for exams and share study materials.",
    image: null,
    status: "rejected",
    tags: ["education"],
    created_at: "2025-09-05",
  },
];

export default function UserGroupCreationRequestPage() {
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.notification.groupRequest);

  const fetchRequests = async () => {
    dispatch(fetchGroupRequest());
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchRequests();
    }
  }, []);

  // Replace with real API delete call
  const deleteRequestApi = async (id) => {
    await new Promise((r) => setTimeout(r, 300)); // simulate
    return true;
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this group request? This action cannot be undone.");
    if (!ok) return;

    try {
      await deleteRequestApi(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">My Group Requests</h1>
          </div>

          <div>
            <button className="btn btn-sm btn-ghost" onClick={() => fetchRequests()} aria-label="Refresh requests">
              Refresh
            </button>
            <Link to={-1} className="btn btn-sm btn-ghost">
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
                <Link key={notification.id} to={`/group/requests/${notification.id}`}>
                  <GroupRequestNotificationItem notification={notification} onDelete={handleDelete} />
                </Link>
              ))}
            </ul>
          )}
        </div>

        <footer className="mt-6 text-sm text-gray-500 text-center">
          Showing <strong>{requests.length}</strong> requests
        </footer>
      </div>
    </div>
  );
}
