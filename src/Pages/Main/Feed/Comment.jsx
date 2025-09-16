import { useDispatch, useSelector } from "react-redux";
import PostComment from "../../../Components/Feed/PostComment";
import PostDetail from "../../../Components/Feed/PostDetail";
import PostQuickAction from "../../../Components/Feed/PostQuickAction";
import { useNavigate, useParams } from "react-router-dom";
import { fetchComments, fetchDetailPost } from "../../../Redux/post/postSlice";
import { useEffect } from "react";

export default function CommentPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { detail, comment } = useSelector((state) => state.post);
  const navigate = useNavigate();
  useEffect(() => {
    if (detail.data?.id === id) return;
    dispatch(fetchDetailPost(id));
  }, []);

  useEffect(() => {
    if (!detail.data?.id) return;
    dispatch(fetchComments({ pagination: comment.pagination, id: detail.data?.id }));
  }, [dispatch, detail.data?.id]);

  return (
    <div className="min-h-screen bg-base-100 py-8 w-full p-3">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} aria-label="Back">
              Back
            </button>
          </div>
          <PostDetail detail={detail} />
          <PostComment postId={detail.data?.id} user={user} detail={detail} comment={comment} />
        </main>
        <PostQuickAction user={user} detail={detail} />
      </div>
    </div>
  );
}
