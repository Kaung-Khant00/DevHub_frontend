import {
  FaFlag,
  FaHeart,
  FaLink,
  FaRegCommentDots,
  FaShareAlt,
} from "react-icons/fa";
import FollowButton from "./FollowButton";
import { BsGraphUpArrow } from "react-icons/bs";

const PostQuickAction = ({ detail, user }) => {
  return (
    <aside className="lg:col-span-1 space-y-6">
      {/* Quick Actions card */}
      <div className="card bg-base-100 border border-base-200 p-4 rounded-2xl">
        <div className="text-sm text-base-content/70">
          <div className="mb-2">
            <strong>Published</strong>
          </div>
          <div className="mb-3 text-xs">
            {detail.data?.created_at_formatted}
          </div>

          <div className="mb-2">
            <strong>Stats</strong>
          </div>

          <div className="text-xs text-base-content/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaHeart className="text-base-content/60" />
                <span>Likes</span>
              </div>
              <div className="font-medium">
                {detail.data?.liked_users_count ?? 0}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaRegCommentDots className="text-base-content/60" />
                <span>Comments</span>
              </div>
              <div className="font-medium">
                {detail.data?.comments_count ?? 3}
              </div>
            </div>
          </div>
        </div>

        {/* Actions grid */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="btn btn-outline btn-primary btn-sm w-full flex items-center justify-center gap-2"
            // onClick={handleShare}
          >
            <FaShareAlt /> <span className="text-xs">Share</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-primary btn-sm w-full flex items-center justify-center gap-2"
            // onClick={handleCopyLink}
          >
            <FaLink /> <span className="text-xs">Copy</span>
          </button>

          {detail.data?.user.id === user?.id ? (
            <button className="btn btn-primary btn-sm w-full col-span-2 flex items-center justify-center gap-2">
              <BsGraphUpArrow /> <span className="text-xs">Analysis post</span>
            </button>
          ) : (
            <>
              <FollowButton />

              <button
                type="button"
                className="btn btn-outline btn-error btn-sm w-full flex items-center justify-center gap-2"
                // onClick={handleReport}
              >
                <FaFlag /> <span className="text-xs">Report</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default PostQuickAction;
