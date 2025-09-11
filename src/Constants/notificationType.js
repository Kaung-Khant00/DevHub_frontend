import { FaBell, FaCheckCircle, FaExclamationTriangle, FaShareSquare, FaTimesCircle } from "react-icons/fa";

export const NOTIFICATION_TYPES = {
  GROUP_CREATION_REQUEST_APPROVED: {
    label: "Group Approved",
    Icon: FaCheckCircle,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    badgeText: "Approved",
  },

  GROUP_CREATION_REQUEST_REJECTED: {
    label: "Group Rejected",
    Icon: FaTimesCircle,
    colorClass: "text-red-500",
    bgClass: "bg-red-50",
    badgeText: "Rejected",
  },

  SHARED_POST: {
    label: "Shared Post",
    Icon: FaShareSquare,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    badgeText: "Shared",
  },

  POST_REMOVED_VIOLATION: {
    label: "Post Removed",
    Icon: FaExclamationTriangle,
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    badgeText: "Violation",
  },

  SYSTEM: {
    label: "System",
    Icon: FaBell,
    colorClass: "text-gray-600",
    bgClass: "bg-gray-100",
    badgeText: "System",
  },

  // fallback
  DEFAULT: {
    label: "Notification",
    Icon: FaBell,
    colorClass: "text-gray-600",
    bgClass: "bg-gray-100",
    badgeText: "Info",
  },
};
