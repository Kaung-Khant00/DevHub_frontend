import { FaPlus, FaImage, FaCode, FaFile } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function GroupComposer({ id }) {
  const { loading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="cardBox">
      <div className=" p-4">
        <div className="flex gap-3 items-center">
          {/* Avatar */}
          <div className="avatar">
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full ">
                {loading ? (
                  <div className="skeleton w-10 h-10 rounded-full"></div>
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.profile_image_url}
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </div>
            </Link>
          </div>

          {/* Fake Input (clickable) */}
          <button
            onClick={() => navigate(`post/create`)}
            className="flex-1 text-left input input-bordered cursor-pointer hover:bg-base-200 transition">
            Start a post…
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex justify-between items-center text-sm text-base-content/70">
          <div className="flex gap-5">
            <button
              className="flex items-center gap-2 hover:text-primary"
              onClick={() => navigate("/post/create?tab=image")}>
              <FaImage /> Photo
            </button>
            <button
              className="flex items-center gap-2 hover:text-primary"
              onClick={() => navigate("/post/create?tab=code")}>
              <FaCode /> Code
            </button>
            <button
              className="flex items-center gap-2 hover:text-primary"
              onClick={() => navigate("/post/create?tab=file")}>
              <FaFile /> File
            </button>
          </div>
          <button onClick={() => navigate("/post/create")} className="btn btn-primary btn-sm">
            <FaPlus /> New Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupComposer;
