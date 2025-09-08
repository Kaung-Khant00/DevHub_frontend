import { FaShareSquare, FaBell, FaRegNewspaper, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { MdGroupAdd, MdOutlineMarkEmailRead } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { LuMailCheck } from "react-icons/lu";

const ICON_MAP = {
  group: MdGroupAdd,
  post: FaRegNewspaper,
  shared: FaShareSquare,
  system: FiSettings,
};

function NotificationItem({ notification, onToggleRead, onAction }) {
  const Icon = ICON_MAP[notification.type] || FaBell;
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
          <Icon className={`text-xl ${notification.is_read ? "text-gray-400" : "text-primary"}`} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex gap-2 items-center">
              <h3 className="text-sm font-semibold leading-tight">{notification.title}</h3>
              {!notification.is_read && <div className="badge badge-soft badge-primary">New</div>}
            </div>
            <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">{notification.created_at}</p>
            <div className="mt-2 flex gap-2 justify-end">
              <button
                onClick={() => onToggleRead(notification.id)}
                className={`btn  ${notification.is_read ? "btn-outline" : "btn-soft"} btn-primary`}>
                {notification.is_read ? <FaEnvelope size={16} /> : <FaEnvelopeOpen size={16} />}
                {notification.is_read ? "Mark Unread" : "Mark Read"}
              </button>
              <button onClick={() => onAction(notification)} className="btn btn-soft btn-primary">
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
