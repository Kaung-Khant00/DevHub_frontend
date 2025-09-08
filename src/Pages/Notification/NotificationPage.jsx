import { useMemo, useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationItem from "../../Components/Notification/NotificationItem";
import NotificationTabs from "../../Components/Notification/NotificationTabs";

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: "group", // group | post | system | shared
    title: "Group Approved: Cycling Club",
    description: "Your request to create 'Cycling Club' has been approved. You are now the group leader.",
    data: { group_id: 42, redirect_url: "/groups/42" },
    is_read: false,
    created_at: "2025-09-08T08:20:00Z",
    actor_id: 5, // admin who acted
  },
  {
    id: 2,
    type: "shared",
    title: "New Post Shared in Tech Hub",
    description: "A post you follow was shared in 'Tech Hub' — check it out.",
    data: { post_id: 121, group_id: 7 },
    is_read: false,
    created_at: "2025-09-07T18:30:00Z",
    actor_id: 8,
  },
  {
    id: 3,
    type: "system",
    title: "Scheduled Maintenance",
    description: "Planned maintenance on Sep 10, 02:00 - 04:00 UTC. Services may be temporarily unavailable.",
    data: { ticket: "MAINT-20250910" },
    is_read: true,
    created_at: "2025-09-06T10:00:00Z",
    actor_id: null,
  },
  {
    id: 4,
    type: "group",
    title: "Group Request Denied: Study Group",
    description: "Your request for 'Study Group' was not approved. Reason: duplicate group exists.",
    data: { reason: "Duplicate", group_request_id: 77 },
    is_read: false,
    created_at: "2025-09-08T09:45:00Z",
    actor_id: 2,
  },
];

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState("all"); // all | shared | group | system
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const filtered = useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "more") return notifications; // placeholder
    return notifications.filter((n) => n.type === activeTab);
  }, [activeTab, notifications]);

  function handleToggleRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: !n.is_read } : n)));
  }

  function handleAction(notification) {
    // Open or navigate - placeholder
    alert(JSON.stringify(notification.data, null, 2));
  }

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  function handleClearRead() {
    setNotifications((prev) => prev.filter((n) => !n.is_read));
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <p className="text-sm text-gray-500">Manage alerts, system messages and user actions.</p>
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

        <div className="card bg-base-100 p-4">
          <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4 space-y-3">
            <div className="text-center py-16">
              <FaBell className="text-5xl mx-auto text-primary/90" />
              <h3 className="mt-6 text-lg font-semibold">You're all caught up</h3>
              <p className="text-sm text-gray-500 mt-2">
                No notifications in this category right now. Check back later or adjust your notification settings.
              </p>
            </div>
            {filtered.map((noti) => (
              <NotificationItem
                key={noti.id}
                notification={noti}
                onToggleRead={handleToggleRead}
                onAction={handleAction}
              />
            ))}
          </div>
        </div>

        <footer className="mt-6 text-center text-sm text-gray-400">
          Showing <strong>{filtered.length}</strong> notifications • Total <strong>{notifications.length}</strong>
        </footer>
      </div>
    </div>
  );
}
