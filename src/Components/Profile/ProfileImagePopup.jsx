import React, { useEffect, useState } from "react";
import { FaTrash, FaUpload, FaTimes, FaSave, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editProfileImage,
  removeProfileImage,
} from "../../Redux/user/userSlice";

export default function ProfileImagePopup() {
  const [open, setOpen] = useState(false);
  const [localFile, setLocalFile] = useState(null);
  const [localPreview, setLocalPreview] = useState();
  const dispatch = useDispatch();
  const { user, loading, deleteLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.profile_image_url) {
      setLocalPreview(user?.profile_image_url || null);
    }
  }, [user?.profile_image_url]);

  function handleSelectFile(e) {
    const file = e.target.files?.[0] || null;
    if (!file || !file.type.startsWith("image/")) return;
    setLocalFile(file);
    setLocalPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!localFile) {
      return toast.error("Please select an image file.");
    }
    dispatch(editProfileImage({ image: localFile, setOpen }));
  }

  async function handleRemove() {
    dispatch(removeProfileImage(setOpen));
    setLocalFile(null);
    setLocalPreview(null);
  }

  return (
    <>
      {/* Avatar + Edit button (replace your existing block with this) */}
      <div className="flex-shrink-0">
        <div className="avatar flex justify-center my-6">
          <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-2 overflow-hidden shadow">
            {loading ? (
              <div className="skeleton w-20 h-20 rounded-full"></div>
            ) : (
              <>
                {user?.profile_image_url ? (
                  <img
                    src={user?.profile_image_url}
                    alt="profile image"
                    className="object-cover object-center w-20 h-20"
                  />
                ) : (
                  <div className="w-full h-full bg-base-300 flex items-center justify-center text-2xl text-base-content/60">
                    {user?.name && user.name[0].toUpperCase()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => setOpen(true)}
          >
            <FaEye /> <span className="ml-2">Edit Image</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-base-100 rounded-2xl shadow-xl w-full max-w-xl mx-4 overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between p-4 border-b border-base-200">
              <h3 className="text-lg font-semibold">Edit Profile Image</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* body */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* preview */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden ring ring-offset-4 ring-base-100 shadow-md">
                  {localPreview ? (
                    <img
                      src={localPreview}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-base-300 flex items-center justify-center text-3xl text-base-content/60">
                      {user?.name && user.name[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* controls */}
              <div className="col-span-2 flex flex-col gap-3">
                <div>
                  <label className="label">
                    <span className="label-text">Choose a new image</span>
                  </label>
                  <input
                    type="file"
                    onChange={handleSelectFile}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="file-input file-input-bordered w-full"
                  />
                  <p className="text-xs opacity-70 mt-1">
                    PNG, JPG, WebP, JPeg allowed — Recommended 400x400
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary flex flex-1 items-center gap-2"
                    onClick={handleSave}
                    disabled={loading || !localFile}
                  >
                    <FaSave /> <span>{loading ? "Saving" : "Save"}</span>
                  </button>

                  {user?.profile_image_url && (
                    <button
                      type="button"
                      className="btn btn-error flex flex-1 items-center gap-2 ml-auto text-white"
                      onClick={handleRemove}
                      disabled={deleteLoading || !user?.profile_url}
                    >
                      <FaTrash />{" "}
                      <span>{deleteLoading ? "Removing" : "Remove"}</span>
                    </button>
                  )}
                </div>

                {/* optional hint / preview filename */}
                {localFile && (
                  <div className="text-sm text-gray-600">
                    Selected file: <strong>{localFile.name}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
