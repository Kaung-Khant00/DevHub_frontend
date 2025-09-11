import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export function StatusBadge({ status = "pending" }) {
  if (status === "approved")
    return (
      <span className="badge badge-sm badge-outline text-success">
        <FaCheckCircle className="inline mr-1" /> Approved
      </span>
    );
  if (status === "rejected")
    return (
      <span className="badge badge-sm badge-outline text-error">
        <FaTimesCircle className="inline mr-1" /> Rejected
      </span>
    );
  return (
    <span className="badge badge-sm badge-outline text-warning">
      <FaClock className="inline mr-1" /> Pending
    </span>
  );
}
