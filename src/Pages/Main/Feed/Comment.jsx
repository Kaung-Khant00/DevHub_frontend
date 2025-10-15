import { useDispatch, useSelector } from "react-redux";
import PostComment from "../../../Components/Feed/PostComment";
import PostDetail from "../../../Components/Feed/PostDetail";
import PostQuickAction from "../../../Components/Feed/PostQuickAction";
import { useParams } from "react-router-dom";
import { fetchComments, fetchDetailPost } from "../../../Redux/post/postSlice";
import { useEffect } from "react";
import ReturnBackButton from "../../../Components/Common/ReturnBackButton";

export default function CommentPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { detail, comment } = useSelector((state) => state.post);
  const loading = useSelector((state) => state.post.detail.loading);
  useEffect(() => {
    if (detail.data?.id != id) {
      dispatch(fetchDetailPost(id));
    }
  }, []);

  useEffect(() => {
    if (!detail.data?.id || loading) return;
    dispatch(fetchComments({ pagination: comment.pagination, id: detail.data?.id }));
  }, [dispatch, detail.data?.id]);

  return (
    <div className="min-h-screen bg-base-100 py-8 w-full p-3">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <ReturnBackButton defaultBackTo="/feed" except="/feed" />
            <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
          </div>
          <PostDetail detail={detail} />
          <PostComment postId={detail.data?.id} user={user} detail={detail} comment={comment} />
        </main>
        <PostQuickAction user={user} detail={detail} />
      </div>
    </div>
  );
}
