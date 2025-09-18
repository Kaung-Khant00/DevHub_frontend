import { useDispatch, useSelector } from "react-redux";
import PostQuickAction from "../../Components/Feed/PostQuickAction";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { fetchGroupPostComments, fetchGroupPostDetail } from "../../Redux/group/groupPostsSlice";
import GroupPostDetailPage from "./GroupPostDetail";
import GroupPostComment from "./GroupPostComment";

export default function GroupCommentPage() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { detail } = useSelector((state) => state.groupPost);
  const likeLoading = useSelector((state) => state.groupPost.likeLoading);
  const comment = useSelector((state) => state.groupPost.comment);
  const isCommentFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGroupPostDetail(postId));
  }, []);
  useEffect(() => {
    if (isCommentFetched.current) return;
    isCommentFetched.current = true;
    dispatch(fetchGroupPostComments({ pagination: comment?.pagination, postId }));
  }, []);
  /*   useEffect(() => {
    if (!detail.data?.id) return;
    dispatch(fetchComments({ pagination: comments.pagination, id: detail.data?.id }));
  }, [dispatch, detail.data?.id]); */

  return (
    <div className="min-h-screen bg-base-100 py-8 w-full p-3">
      <div className="mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Comments</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} aria-label="Back">
              Back
            </button>
          </div>
          <GroupPostDetailPage detail={detail} />
          <GroupPostComment
            likeLoading={likeLoading}
            postId={detail.data?.id}
            user={user}
            detail={detail}
            comment={comment}
          />
        </main>
        <PostQuickAction user={user} detail={detail} />
      </div>
    </div>
  );
}
