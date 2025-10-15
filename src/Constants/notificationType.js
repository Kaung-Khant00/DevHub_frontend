import { FaBell, FaCheckCircle, FaExclamationTriangle, FaShareSquare, FaTimesCircle } from "react-icons/fa";

export const NOTIFICATION_TYPES = {
  GROUP_CREATION_REQUEST_APPROVED: {
    Icon: FaCheckCircle,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    badgeText: "Approved",
  },

  GROUP_CREATION_REQUEST_REJECTED: {
    Icon: FaTimesCircle,
    colorClass: "text-red-500",
    bgClass: "bg-red-50",
    badgeText: "Rejected",
  },

  SHARED_POST: {
    Icon: FaShareSquare,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    badgeText: "Shared",
  },
  POST_REMOVED_TEMPORARY: {
    Icon: FaExclamationTriangle,
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    badgeText: "Post",
  },
  POST_RESTORED: {
    Icon: FaCheckCircle,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    badgeText: "Post",
  },
  POST_DELETED_PERMANENTLY: {
    Icon: FaExclamationTriangle,
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    badgeText: "Violation",
  },
  POST_REPORTED: {
    Icon: FaExclamationTriangle,
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    badgeText: "Violation",
  },
  SOLUTION: {
    Icon: FaCheckCircle,
    colorClass: "text-success",
    bgClass: "bg-success/10",
    badgeText: "Violation",
  },
  SYSTEM: {
    Icon: FaBell,
    colorClass: "text-gray-600",
    bgClass: "bg-gray-100",
    badgeText: "System",
  },

  // fallback
  DEFAULT: {
    Icon: FaBell,
    colorClass: "text-gray-600",
    bgClass: "bg-gray-100",
    badgeText: "Info",
  },
};
