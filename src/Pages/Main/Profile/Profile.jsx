import { useEffect } from "react";
import { FaMapMarkerAlt, FaEdit, FaCog, FaShareAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../../Redux/user/userSlice";
import { Link, useParams } from "react-router-dom";
import ProfilePostSearch from "../../../Components/Profile/ProfilePostSearch";
import ProfileAbout from "./ProfileAbout";
import ProfileQuickLink from "../../../Components/Profile/ProfileQuickLink";
import ProfilePosts from "../../../Components/Profile/ProfilePosts";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";

function Stat({ value, label }) {
  return (
    <div className="stat text-center">
      <div className="stat-value md:text-3xl font-extrabold">{value ?? "—"}</div>
      <div className="stat-title">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { profile, user } = useSelector((state) => state.user);
  const { data, loading } = useSelector((state) => state.user.userPosts);
  const skills = useSelector((state) => state.user.profile?.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts());
    dispatch(fetchUser());
  }, []);
  return (
    <div className="w-full flex-1">
      {user && profile && (
        <div className=" min-h-screen bg-base-100">
          {/* Cover */}
          <div className="relative">
            <ReturnBackButton defaultBackTo={"/feed"} except={"/profile/edit"} />
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
          <div className="relative w-full mx-auto px-4 pt-16 md:pt-20">
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
                    </div>
                    <p className="mt-1 text-sm opacity-80 max-w-2xl">{user.bio || ""}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {profile?.address && (
                        <span className="inline-flex items-center gap-1 opacity-80">
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
                    <Link to="/profile/edit" className="btn btn-primary btn-sm gap-2">
                      <FaEdit size={16} /> Edit profile
                    </Link>
                    <button className="btn btn-outline btn-sm gap-2">
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
                    </div>
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

                <ProfileQuickLink />
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProfileAbout profile={profile} skills={skills} user={user} />

            {/* Posts */}
            <main className="lg:col-span-2">
              <ProfilePostSearch postsLength={data?.length} />
              <ProfilePosts posts={data} loading={loading} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
