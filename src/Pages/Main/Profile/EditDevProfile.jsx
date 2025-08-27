import React, { useEffect, useState } from "react";
import {
  FaSave,
  FaTimes,
  FaTrash,
  FaPlus,
  FaPhone,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { __EDIT_PROFILE__ } from "../../../Redux/user/userAction";

export default function DeveloperProfileEdit() {
  // Local form state
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState(() => parseSkills());
  const [newSkill, setNewSkill] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.image || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { profileEdit } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setAvatarPreview(user.profile_url || "");
  }, [user.profile_url]);

  useEffect(() => {
    setSkills(parseSkills(profile.skill));
  }, [profile.skill]);

  function handleRemoveProfile() {
    setUser((prev) => ({ ...prev, profile_url: "" }));
    setAvatarPreview("");
  }
  function parseSkills(skillString) {
    if (!skillString) return [];
    return skillString
      .split(/[,|;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function handleAddSkillFromInput() {
    const s = newSkill.trim();
    if (!s) return;
    if (!skills.includes(s)) setSkills((v) => [...v, s]);
    setNewSkill("");
  }

  function handleRemoveSkill(idx) {
    setSkills((v) => v.filter((_, i) => i !== idx));
  }

  function handleAvatarFileChange(file) {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleEditProfile(e) {
    e.preventDefault();
    dispatch(__EDIT_PROFILE__({ ...user, ...profile, skills }));
  }

  async function handleDelete() {
    if (typeof onDelete !== "function") return setShowDeleteConfirm(false);
    try {
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto ">
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost btn-sm md:hidden"
              onClick={() => navigate(-1)}
              aria-label="Back"
            >
              Back
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-primary">
              Edit Profile
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="btn btn-ghost" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </header>
        <form onSubmit={handleEditProfile} className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-base-200 rounded-2xl shadow p-4 md:p-6 border border-base-200">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-2 overflow-hidden shadow">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="avatar preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-base-300 flex items-center justify-center text-2xl text-base-content/60">
                        {user.name ? user.name[0] : "U"}
                      </div>
                    )}
                  </div>
                </div>

                <label className="mt-2 block text-xs opacity-80">
                  Upload Profile Image
                </label>

                <input
                  aria-label="Upload avatar"
                  onChange={(e) => handleAvatarFileChange(e.target.files?.[0])}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  className="file-input file-input-sm file-input-bordered mt-2"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-error mt-2 text-white"
                  onClick={handleRemoveProfile}
                >
                  Remove Uploading Profile
                </button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <div className="flex-1">
                    <label className="label">
                      <span className="label-text">Full name</span>
                    </label>
                    <input
                      className={`input input-bordered w-full ${
                        profileEdit.error?.name ? "input-error" : ""
                      }`}
                      value={user.name}
                      onChange={(e) =>
                        setUser((u) => ({ ...u, name: e.target.value }))
                      }
                    />
                    {profileEdit.error?.name && (
                      <div className="text-xs text-error mt-1">
                        {profileEdit.error?.name}
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-64 mt-3 md:mt-0">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <FaPhone className="opacity-70" />
                      <input
                        className="input input-bordered w-full"
                        value={user.phone || ""}
                        onChange={(e) =>
                          setUser((u) => ({ ...u, phone: e.target.value }))
                        }
                        placeholder="+95 9 123 456 789"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    className={`input input-bordered w-full ${
                      profileEdit.error?.email ? "input-error" : ""
                    }`}
                    value={user.email}
                    onChange={(e) =>
                      setUser((u) => ({ ...u, email: e.target.value }))
                    }
                  />
                  {profileEdit.error?.email && (
                    <div className="text-xs text-error mt-1">
                      {profileEdit.error?.email}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={user.bio || ""}
                    onChange={(e) =>
                      setUser((u) => ({ ...u, bio: e.target.value }))
                    }
                    placeholder="A one-line description about you"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Developer profile fields */}
          <div className="bg-white dark:bg-base-200 rounded-2xl shadow p-4 md:p-6 border border-base-200">
            <h3 className="font-medium">Developer profile</h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={profile.address || ""}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="City, region, country"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Portfolio / Website</span>
                </label>
                <div className="flex items-center gap-2">
                  <FaGlobe className="opacity-70" />
                  <input
                    className={`input input-bordered w-full ${
                      profileEdit.error?.portfolio_url ? "input-error" : ""
                    }`}
                    value={profile.portfolio_url || ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        portfolio_url: e.target.value,
                      }))
                    }
                    placeholder="https://your.site"
                  />
                </div>
                {profileEdit.error?.portfolio_url && (
                  <div className="text-xs text-error mt-1">
                    {profileEdit.error?.portfolio_url}
                  </div>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">GitHub</span>
                </label>
                <div className="flex items-center gap-2">
                  <FaGithub className="opacity-70" />
                  <input
                    className={`input input-bordered w-full ${
                      profileEdit.error?.github_url ? "input-error" : ""
                    }`}
                    value={profile.github_url || ""}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, github_url: e.target.value }))
                    }
                    placeholder="https://github.com/username"
                  />
                </div>
                {profileEdit.error?.github_url && (
                  <div className="text-xs text-error mt-1">
                    {profileEdit.error?.github_url}
                  </div>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">LinkedIn</span>
                </label>
                <div className="flex items-center gap-2">
                  <FaLinkedin className="opacity-70" />
                  <input
                    className={`input input-bordered w-full ${
                      profileEdit.error?.linkedin_url ? "input-error" : ""
                    }`}
                    value={profile.linkedin_url || ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        linkedin_url: e.target.value,
                      }))
                    }
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                {profileEdit.error?.linkedin_url && (
                  <div className="text-xs text-error mt-1">
                    {profileEdit.error?.linkedin_url}
                  </div>
                )}
              </div>
            </div>

            {/* Skills input */}
            <div className="mt-6">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  className="input input-bordered input-sm flex-1"
                  placeholder="Type a skill and press Enter or comma"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddSkillFromInput();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleAddSkillFromInput}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((s, i) => (
                    <span
                      key={i}
                      className="badge badge-outline flex items-center gap-2"
                    >
                      {s}
                      <button
                        type="button"
                        className="btn btn-xs btn-ghost"
                        onClick={() => handleRemoveSkill(i)}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <div className="text-sm opacity-70">
                    No skills yet — add a few.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className={`btn btn-primary ${
                  profileEdit?.loading ? "loading" : ""
                }`}
                disabled={profileEdit?.loading}
                aria-label="Save"
              >
                <FaSave /> <span className="ml-2">Save changes</span>
              </button>

              <Link to="/profile" className="btn btn-ghost" aria-label="Cancel">
                <FaTimes /> Cancel
              </Link>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={() => setShowDeleteConfirm(true)}
                aria-label="Delete account"
              >
                <FaTrash /> Delete account
              </button>
            </div>
          </div>

          {/* Server error */}
          {profileEdit.error?.server && (
            <div className="text-sm text-error">
              {profileEdit.error?.server}
            </div>
          )}
        </form>
      </div>
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-base-100 rounded-xl p-6 max-w-md w-full shadow-lg border border-base-200">
            <h3 className="text-lg font-semibold">Confirm account deletion</h3>
            <p className="mt-2 text-sm opacity-80">
              This action cannot be undone. All your data will be removed. Are
              you sure?
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className={`btn btn-error ${
                  profileEdit?.loading ? "loading" : ""
                }`}
                onClick={handleDelete}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
