import { FaFire, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

function CreatorSnapshot() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="card shadow-xl bg-gradient-to-br from-base-100 to-base-300 border border-base-300">
      <div className="card-body p-5">
        {/* Profile Header */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={user?.profile_image_url} alt="me" />
            </div>
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">{user?.name}</div>
            <div className="text-sm text-base-content/60">
              Full-stack tinkerer
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="badge badge-primary badge-outline">React</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="stat bg-base-100 rounded-box">
            <div className="stat-title">Reputation</div>
            <div className="stat-value text-xl">981</div>
          </div>
          <div className="stat bg-base-100 rounded-box">
            <div className="stat-title">Followers</div>
            <div className="stat-value text-xl">4.2k</div>
          </div>
          <div className="stat bg-base-100 rounded-box">
            <div className="stat-title">Posts</div>
            <div className="stat-value text-xl">{user?.posts_count}</div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="mt-3 bg-base-100 rounded-lg p-3 border border-base-300 flex items-center gap-3 w-full shadow-sm">
          <div className="p-2 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <FaFire size={18} />
          </div>

          <div className="flex flex-col">
            <div className="font-medium text-sm">Daily Streak</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-orange-600 leading-none">
                5
              </span>
              <span className="text-xs text-base-content/60">days active</span>
            </div>
          </div>
        </div>

        {/* Separate New Post Button */}
        <div className="mt-4">
          <button className="btn btn-primary w-full flex items-center gap-2">
            <FaPlus /> New Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreatorSnapshot;
