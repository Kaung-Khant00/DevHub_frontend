import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaTrash, FaPlus, FaGithub, FaLinkedin, FaGlobe, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileImagePopup from "../../../Components/Profile/ProfileImagePopup";
import { editProfile } from "../../../Redux/user/userSlice";
import DeleteUser from "../../Auth/DeleteUser";

export default function DeveloperProfileEdit() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { loading, user, error, profile: authProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [profile, setProfile] = useState({});
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  useEffect(() => {
    if (authProfile) {
      setProfile(authProfile);
    }
  }, [authProfile]);
  useEffect(() => {
    setSkills(profile.skills || []);
  }, [profile.skills]);

  function handleAddSkillFromInput() {
    const s = newSkill.trim();
    if (!s) return;
    if (!skills.includes(s)) setSkills((v) => [...v, s.slice(0, 50)]);
    setNewSkill("");
  }

  function handleRemoveSkill(idx) {
    setSkills((v) => v.filter((_, i) => i !== idx));
  }

  async function handleEditProfile(e) {
    e.preventDefault();
    dispatch(editProfile({ ...userData, ...profile, skills }));
  }

  /*   async function handleDelete() {
    try {
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteConfirm(false);
    }
  } */

  return (
    <div className="min-h-screen w-full bg-base-100 p-4 md:p-8">
      <div>
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Link to={`/profile`} className="btn btn-ghost btn-square" aria-label="Back" title="Back">
              <FaArrowLeft className="w-10 h-5" />
            </Link>
            <h1 className="text-xl md:text-2xl font-semibold text-primary">Edit Profile</h1>
          </div>
        </header>
        <form onSubmit={handleEditProfile} className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-base-200 rounded-2xl shadow p-4 md:p-6 border border-base-200">
            <div className="flex sm:flex-row flex-col items-center gap-4">
              <div className="mx-3">
                <ProfileImagePopup />
              </div>

              <div className="flex-1 w-full flex justify-content-start gap-2">
                <div>
                  <div className="flex flex-col flex-2 md:items-center md:gap-4">
                    <div className="flex-1 w-full">
                      <label className="label">
                        <span className="label-text">Full name</span>
                      </label>
                      <input
                        className={`input input-bordered w-full ${error?.name ? "input-error" : ""}`}
                        value={userData?.name || ""}
                        onChange={(e) => setUserData((u) => ({ ...u, name: e.target.value }))}
                      />
                      {error?.name && <div className="text-xs text-error mt-1">{error?.name}</div>}
                    </div>

                    <div className="w-full">
                      <label className="label">
                        <span className="label-text">Phone</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="input input-bordered w-full"
                          value={userData?.phone || ""}
                          onChange={(e) =>
                            setUserData((u) => ({
                              ...u,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="+95 9 123 456 789"
                        />
                      </div>
                      {error?.phone && <div className="text-xs text-error mt-1">{error?.phone}</div>}
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="label-text">Main Career</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          className="input input-bordered w-full"
                          value={userData?.career}
                          onChange={(e) =>
                            setUserData((u) => ({
                              ...u,
                              main_career: e.target.value,
                            }))
                          }
                          placeholder="Software Developer"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <select
                        className="select select-bordered"
                        onChange={(e) => setUserData((u) => ({ ...u, gender: e.target.value }))}>
                        <option selected disabled>
                          Choose gender
                        </option>
                        <option value={"male"}>Male</option>
                        <option value={"female"}>Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className=" flex-3">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={userData?.bio || ""}
                    onChange={(e) => setUserData((u) => ({ ...u, bio: e.target.value }))}
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
                  onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
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
                    className={`input input-bordered w-full ${error?.portfolio_url ? "input-error" : ""}`}
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
                {error?.portfolio_url && <div className="text-xs text-error mt-1">{error?.portfolio_url}</div>}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">GitHub</span>
                </label>
                <div className="flex items-center gap-2">
                  <FaGithub className="opacity-70" />
                  <input
                    className={`input input-bordered w-full ${error?.github_url ? "input-error" : ""}`}
                    value={profile.github_url || ""}
                    onChange={(e) => setProfile((p) => ({ ...p, github_url: e.target.value }))}
                    placeholder="https://github.com/username"
                  />
                </div>
                {error?.github_url && <div className="text-xs text-error mt-1">{error?.github_url}</div>}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">LinkedIn</span>
                </label>
                <div className="flex items-center gap-2">
                  <FaLinkedin className="opacity-70" />
                  <input
                    className={`input input-bordered w-full ${error?.linkedin_url ? "input-error" : ""}`}
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
                {error?.linkedin_url && <div className="text-xs text-error mt-1">{error?.linkedin_url}</div>}
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
                  onChange={(e) => {
                    if (e.target.value.length < 50) {
                      setNewSkill(e.target.value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddSkillFromInput();
                    }
                  }}
                />
                <button type="button" className="btn btn-sm" onClick={handleAddSkillFromInput}>
                  <FaPlus />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {skills?.length ? (
                  skills.map((s, i) => (
                    <span key={i} className="badge badge-outline flex items-center gap-2">
                      {s}
                      <button type="button" className="btn btn-xs btn-ghost" onClick={() => handleRemoveSkill(i)}>
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <div className="text-sm opacity-70">No skills yet — add a few.</div>
                )}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
                aria-label="Save">
                <FaSave /> <span className="ml-2">Save changes</span>
              </button>

              <Link to="/profile" className="btn btn-ghost" aria-label="Cancel">
                <FaTimes /> Cancel
              </Link>
            </div>

            {
              <div>
                <button
                  type="button"
                  className="btn btn-outline btn-error"
                  onClick={() => setShowDeleteConfirm(true)}
                  aria-label="Delete account">
                  <FaTrash /> Delete account
                </button>
              </div>
            }
          </div>

          {/* Server error */}
          {error?.server && <div className="text-sm text-error">{error?.server}</div>}
        </form>
      </div>
      {/* Delete confirmation modal */}
      {showDeleteConfirm && <DeleteUser setShowDeleteConfirm={setShowDeleteConfirm} />}
    </div>
  );
}
