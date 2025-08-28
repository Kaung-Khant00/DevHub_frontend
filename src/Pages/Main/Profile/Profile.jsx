import React, { useMemo, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaLink,
  FaBell,
  FaEdit,
  FaCog,
  FaShareAlt,
  FaUsers,
  FaUserCheck,
  FaFolder,
  FaChevronDown,
  FaCheckCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * DevHub — Developer Profile Page (daisyUI + TailwindCSS)
 *
 * Updated to use react-icons instead of lucide-react.
 */

function QuickLink() {
  return (
    <div className="mt-4 flex w-full bg-white rounded shadow-sm">
      <div className="tabs tabs-boxed w-full">
        <a
          className="btn tab flex-1 font-bold hover:bg-primary/20"
          href="/followers"
        >
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaUsers />
          </div>{" "}
          <span className="text-primary">Followers</span>
        </a>
        <a
          className="tab flex-1 btn font-bold text-primary hover:bg-primary/20"
          href="/groups/joined"
        >
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaFolder />
          </div>{" "}
          <span className="text-primary">Joined Groups</span>
        </a>
        <a className="tab flex-1 btn hover:bg-primary/20" href="/notifications">
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaBell />
          </div>
          <span className="text-primary"> Notifications</span>
        </a>
      </div>
    </div>
  );
}
// Small helper: split comma/pipe separated skills into chip list
function useSkillChips(skillString) {
  return useMemo(() => {
    if (!skillString) return [];
    return skillString
      .split(/[,|]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [skillString]);
}

function Stat({ value, label }) {
  return (
    <div className="stat text-center">
      <div className="stat-value md:text-3xl font-extrabold font-inter">
        {value ?? "—"}
      </div>
      <div className="stat-title">{label}</div>
    </div>
  );
}

function ExternalLink({ href, children, icon: Icon }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sm btn-ghost normal-case gap-2"
    >
      {Icon ? <Icon size={18} /> : <FaLink size={18} />}
      <span className=" max-w-[160px]">{children}</span>
    </a>
  );
}

function InfoRow({ Icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 opacity-70">
        <Icon size={18} />
      </div>
      <div className="text-sm leading-relaxed break-words">{children}</div>
    </div>
  );
}

export default function DeveloperProfilePage({
  stats = { posts: 24, followers: 1200, following: 180, groups: 6 },
  isOwnProfile = true,
}) {
  const { profile, user } = useSelector((state) => state.user);
  const skills = useSkillChips(profile?.skill);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  return (
    <>
      {user && profile && (
        <div className=" min-h-screen bg-base-100">
          {/* Cover */}
          <div className="relative">
            <div className="h-30 w-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-b-2xl" />
            <div className="max-w-6xl mx-auto px-4">
              <div className="absolute -bottom-12 md:-bottom-14">
                <div className="avatar">
                  <div className="w-24 md:w-28 rounded-full ring ring-base-100 ring-offset-4 ring-offset-base-100 shadow-2xl">
                    <img
                      src={user.profile_image_url}
                      alt={`${user.name || "User"} avatar`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-20">
            <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
              <div className="card-body p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-semibold">
                        {user.name || "—"}
                      </h1>
                      {user.role && (
                        <div className="badge badge-primary badge-outline gap-1">
                          <FaCheckCircle size={14} /> {user.role}
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-sm opacity-80 max-w-2xl">
                      {user.bio || ""}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      {profile?.address && (
                        <span className="inline-flex items-center gap-1 opacity-80">
                          <FaMapMarkerAlt size={16} />
                          {profile.address}
                        </span>
                      )}
                      <span className="opacity-60">•</span>
                      <span className="opacity-70">
                        Joined{" "}
                        <span className="font-bold">{user.created_at}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/profile/edit"
                      className="btn btn-primary btn-sm gap-2"
                    >
                      <FaEdit size={16} /> Edit profile
                    </Link>
                    <button className="btn btn-outline btn-sm gap-2">
                      <FaShareAlt size={16} /> Share
                    </button>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm btn-ghost"
                      >
                        <FaCog size={18} />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
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
                <div className="mt-4 stats stats-vertical md:stats-horizontal shadow bg-base-100">
                  <Stat value={user?.posts_count} label="Posts" />
                  <Stat value={user?.followers_count} label="Followers" />
                  <Stat value={user?.followings_count} label="Following" />
                  <Stat value={user?.groups_count} label="Joined Groups" />
                </div>

                {/* Quick links */}
                <QuickLink />
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <aside className="lg:col-span-1">
              <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
                <div className="card-body p-4 md:p-6">
                  <h2 className="card-title text-lg">About</h2>
                  <div className="mt-3 space-y-3">
                    <InfoRow Icon={FaEnvelope}>{user?.email || "—"}</InfoRow>
                    {user?.phone && (
                      <InfoRow Icon={FaPhone}>{user.phone}</InfoRow>
                    )}
                    {profile?.address && (
                      <InfoRow Icon={FaMapMarkerAlt}>{profile.address}</InfoRow>
                    )}
                  </div>

                  <div className="divider my-4" />
                  <h3 className="font-medium">Skills</h3>
                  {skills.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <div key={i} className="badge badge-outline">
                          {s}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm opacity-70 mt-2">
                      No skills added yet.
                    </p>
                  )}

                  <div className="divider my-4" />
                  <h3 className="font-medium">Links</h3>
                  <div className="mt-2 flex flex-col gap-2">
                    {!profile?.github_url && !profile?.linkedin_url && (
                      <div className="text-sm opacity-70 mt-2">
                        No Links Provided Yet
                      </div>
                    )}
                    <ExternalLink href={profile?.github_url} icon={FaGithub}>
                      GitHub
                    </ExternalLink>
                    <ExternalLink
                      href={profile?.linkedin_url}
                      icon={FaLinkedin}
                    >
                      LinkedIn
                    </ExternalLink>
                    <ExternalLink href={profile?.portfolio_url} icon={FaGlobe}>
                      Portfolio
                    </ExternalLink>
                  </div>
                </div>
              </div>
            </aside>

            {/* Posts */}
            <main className="lg:col-span-2">
              <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
                <div className="card-body p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="card-title text-lg">My Posts</h2>
                    <div className="flex items-center gap-2">
                      <div className="join">
                        <input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search my posts…"
                          className="input input-sm input-bordered join-item w-48 md:w-64"
                        />
                        <div className="dropdown dropdown-end join-item">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm"
                          >
                            Sort <FaChevronDown size={16} />
                          </div>
                          <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                          >
                            <li>
                              <button
                                className={sortBy === "latest" ? "active" : ""}
                                onClick={() => setSortBy("latest")}
                              >
                                Latest
                              </button>
                            </li>
                            <li>
                              <button
                                className={sortBy === "top" ? "active" : ""}
                                onClick={() => setSortBy("top")}
                              >
                                Top
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  {filteredPosts?.length ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-base-200 shadow-sm"
                    >
                      <div className="p-4 space-y-2">
                        <div className="font-medium truncate">
                          {post.title || "Untitled"}
                        </div>
                        <p className="text-sm opacity-80 line-clamp-3">
                          {post.body || "—"}
                        </p>
                        <div className="text-xs opacity-60">
                          {new Date(post.created_at).toLocaleDateString()} •{" "}
                          {post.likes || 0} likes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6">
                  <div className="alert">
                    <span>No posts yet. Start sharing your work!</span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-base-200 p-4"
                      >
                        <div className="skeleton h-4 w-3/4 mb-2" />
                        <div className="skeleton h-3 w-full mb-1" />
                        <div className="skeleton h-3 w-5/6" />
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
                </div>
              </div>
            </main>
          </div>

          {/* Mobile Action Bar */}
          {isOwnProfile && (
            <div className="lg:hidden fixed bottom-4 left-0 right-0 flex justify-center">
              <div className="btn-group shadow-xl rounded-2xl">
                <a
                  href="/profile/edit"
                  className="btn btn-primary btn-sm gap-2"
                >
                  <FaEdit size={16} /> Edit
                </a>
                <a href="/groups/joined" className="btn btn-sm">
                  <FaFolder size={16} /> Joined Groups
                </a>
                <a href="/followers" className="btn btn-sm">
                  <FaUsers size={16} /> Followers
                </a>
                <a href="/notifications" className="btn btn-sm">
                  <FaBell size={16} /> Notification
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
