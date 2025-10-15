import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaCog, FaShareAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeveloperProfile } from "../../../Redux/user/userSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfilePostSearch from "../../../Components/Profile/ProfilePostSearch";
import ProfileAbout from "../Profile/ProfileAbout";
import ProfilePosts from "../../../Components/Profile/ProfilePosts";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { followUser } from "../../../Redux/post/postSlice";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";

function Stat({ value, label }) {
  return (
    <div className="stat text-center">
      <div className="stat-value md:text-3xl font-extrabold">{value ?? "—"}</div>
      <div className="stat-title">{label}</div>
    </div>
  );
}

export default function DeveloperProfilePage() {
  const { id } = useParams();
  const { profile, user, posts } = useSelector((state) => state.user.viewedProfileUser);
  const authUser = useSelector((state) => state.user.user);
  const skills = useSelector((state) => state.user.viewedProfileUser.profile?.skills);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUserId(id);
  }, [id]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && authUser?.id == id) {
      navigate("/profile");
    }
    if (user?.id !== id) {
      dispatch(fetchDeveloperProfile(id));
    }
  }, [userId, authUser]);

  function makeFollowUserApi() {
    if (userId) {
      dispatch(followUser({ userId, isInProfile: true }));
    }
  }
  return (
    <>
      {user && profile && (
        <div className="w-full min-h-screen bg-base-100">
          {/* Cover */}
          <div className="relative">
            <ReturnBackButton defaultBackTo={"/feed"} />
            <div className="h-30 w-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-b-2xl" />
            <div className="max-w-6xl mx-auto px-4">
              <div className="absolute -bottom-12 md:-bottom-14 max-sm:inset-x-0 flex sm:block justify-center">
                <div className="avatar">
                  <div className="w-24 md:w-28 rounded-full ring ring-base-100 ring-offset-4 ring-offset-base-100 shadow-2xl">
                    <img src={user.profile_image_url} alt={`${user.name || "User"} avatar`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="relative max-w-6xl mx-auto px-4 pt-16 md:pt-20">
            <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
              <div className="card-body p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-semibold">{user.name || "—"}</h1>
                      {user.role && (
                        <div className="badge badge-primary badge-outline gap-1">
                          <FaCheckCircle size={14} /> {user.role}
                        </div>
                      )}
                      {user?.gender && (
                        <div className={`badge ${user?.gender === "male" ? "badge-primary" : "badge-secondary"}`}>
                          {user?.gender}
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-sm opacity-80 max-w-2xl">{user.bio || ""}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {profile?.address && (
                        <span className="inline-flex items-center gap-1 opacity-80 ">
                          <FaMapMarkerAlt size={16} />
                          {profile.address}
                        </span>
                      )}

                      <span className="opacity-60">•</span>
                      <span className="opacity-70">
                        Joined <span className="font-bold">{user.created_at}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={makeFollowUserApi}
                      className={`btn ${
                        user.isFollower && user.isFollowing ? "btn-error text-white" : "btn-primary"
                      } gap-2`}>
                      {user.isFollowing && user.isFollower ? (
                        <HiOutlineUserMinus size={16} />
                      ) : (
                        <HiOutlineUserAdd size={16} />
                      )}{" "}
                      {user.isFollowing && user.isFollower
                        ? "Unfriend"
                        : user?.isFollowing
                        ? "Following"
                        : "Follow Back"}
                    </button>
                    {/* <button className="btn btn-outline gap-2">
                      <FaShareAlt size={16} /> Share
                    </button>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                        <FaCog size={18} />
                      </div>
                      <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                          <a href="/settings/account">Account settings</a>
                        </li>
                        <li>
                          <a href="/settings/privacy">Privacy</a>
                        </li>
                        <li>
                          <a href="/settings/preferences">Preferences</a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 stats stats-horizontal shadow bg-base-100">
                  <Stat value={user?.posts_count} label="Posts" />
                  <Stat value={user?.followers_count} label="Followers" />
                  <Stat value={user?.followings_count} label="Following" />
                  <div className="sm:block hidden">
                    <Stat value={user?.groups_count} label="Joined Groups" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileAbout profile={profile} skills={skills} user={user} />

            {/* Posts */}
            <main className="lg:col-span-2">
              {user?.id === id && <ProfilePostSearch postsLength={posts?.length} id={id} />}
              <ProfilePosts posts={posts} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
