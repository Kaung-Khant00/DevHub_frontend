import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser } from "../../Redux/user/userSlice";

const DeleteUser = ({ setShowDeleteConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const dispatch = useDispatch();
  const DeleteUserApi = async () => {
    try {
      setLoading(true);
      const response = await dispatch(deleteUser(confirmText)).unwrap();
      console.log("USER DELETE", response);
      toast.success("User deleted successfully.");
    } catch {
      toast.error("Failed to delete user.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-xl p-6 max-w-md w-full shadow-lg border border-base-200">
        <h3 className="text-xl font-semibold text-center ">Confirm account deletion</h3>
        <p className="mt-2 text-sm opacity-80">
          This action cannot be reversed. All your data will be removed. Are you sure?
        </p>
        <p className="mt-2 text-sm opacity-80 mb-2">
          Please type "<strong>Delete my account</strong>" to confirm before continuing
        </p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="btn btn-ghost" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </button>
          <button className={`btn btn-error ${loading ? "loading" : ""}`} onClick={DeleteUserApi}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
