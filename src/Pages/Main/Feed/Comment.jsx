import { useSelector } from "react-redux";
import PostComment from "../../../Components/Feed/PostComment";
import PostDetail from "../../../Components/Feed/PostDetail";
import PostQuickAction from "../../../Components/Feed/PostQuickAction";
import { useNavigate } from "react-router-dom";

export default function CommentPage() {
  const { user } = useSelector((state) => state.user);
  const { detail } = useSelector((state) => state.post);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 py-8 w-full p-3">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate(-1)}
              aria-label="Back"
            >
              Back
            </button>
          </div>
          <PostDetail detail={detail} />
          <PostComment postId={detail.data?.id} user={user} detail={detail} />
        </main>
        <PostQuickAction user={user} detail={detail} />
      </div>
    </div>
  );
}
