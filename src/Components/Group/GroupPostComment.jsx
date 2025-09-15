import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost, deleteComment, fetchComments, likeDetailPost, updateComment } from "../../Redux/post/postSlice";
import { FiSend } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommentCard from "../Feed/CommentCard";

const GroupPostComment = ({ postId, user, detail, comments, comment }) => {
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(detail?.data?.liked);
  const [updatingCommentId, setUpdatingCommentId] = useState(null);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  // SET LIKED
  useEffect(() => {
    if (detail?.data) {
      setLiked(detail?.data?.liked);
    }
  }, [detail?.data]);

  // AUTO RESIZE TEXTAREA
  const handleInput = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(320, ta.scrollHeight) + "px"; // max height
  };

  // POST UPDATE OR CREATE IN (ENTER + CTRL/META)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (updatingCommentId) {
        UpdateCommentApi();
      } else {
        createCommentApi();
      }
    }
  };

  // HANDLE UPDATE COMMENT
  function handleUpdateComment(data, commentId) {
    textareaRef.current.value = data;
    textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    textareaRef.current.focus();
    console.log(commentId);
    setUpdatingCommentId(commentId);
  }

  // CANCEL THE COMMENT UPDATE
  function cancelUpdatingComment() {
    setUpdatingCommentId(null);
    textareaRef.current.value = "";
  }

  // API CALL --------------------------
  // PAGINATE COMMENTS
  const FetchMoreCommentsApi = () => {
    if (!comments?.pagination?.nextPageURL) return;
    dispatch(fetchComments({ pagination: comments?.pagination, id: postId }));
  };
  // LIKE THE POST
  function LikePostApi() {
    setLiked((pre) => !pre);
    dispatch(likeDetailPost({ user_id: user?.id, post_id: postId }));
  }
  //CREATE COMMENT
  const createCommentApi = async () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) return;

    try {
      /*  unwrap return the object some looks like this :)
      {
        type: "auth/login/fulfilled",
        payload: { user: {...}, token: "..." },
        meta: {...}
      }
        and I can access the payload and also function like api call
        so I can await the textareaRef.current to clear the value
        and clear it after the api call by not passing it as a parameter in commentPost function from postSlice
      */

      await dispatch(commentPost({ post_id: postId, comment: text })).unwrap();
      ta.value = "";
      ta.style.height = "auto";
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };
  // UPDATE COMMENT
  const UpdateCommentApi = async () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) return;

    try {
      await dispatch(
        updateComment({
          id: updatingCommentId,
          comment: text,
        })
      ).unwrap();
      ta.value = "";
      ta.style.height = "auto";
      toast.success("Comment updated successfully");
    } catch (err) {
      toast.error("Error updating comment !");
      console.error("Comment failed:", err);
    } finally {
      setUpdatingCommentId(null);
    }
  };
  const deleteCommentApi = async (id) => {
    await dispatch(deleteComment(id)).unwrap();
  };
  return (
    <section className="card bg-base-100 border border-base-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight">Comments</h2>
          <p className="text-sm text-base-content/60 mt-1">
            {detail?.data?.comments_count} comment
            {(comments?.data?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-base-content/60">
          <button
            onClick={LikePostApi}
            disabled={detail?.likeLoading}
            className={`flex items-center gap-2 text-sm ${liked ? "text-primary" : "text-base-content/80"}`}>
            {detail?.likeLoading ? (
              <div className="loading loading-spinner loading-sm"></div>
            ) : (
              <>{liked ? <FaHeart size={22} /> : <FaRegHeart size={22} />}</>
            )}
            <span>{detail?.data?.liked_users_count}</span>
          </button>
          <span className="px-3 py-1 bg-base-200 rounded-full text-xs">Sorted: newest</span>
          <button className="btn btn-outline btn-primary btn-sm" onClick={() => navigate(-1)} aria-label="Back">
            Back
          </button>
        </div>
      </div>

      {/* form */}
      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          createCommentApi();
        }}>
        <div className="flex gap-3">
          <div className="avatar shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-base-200 flex items-center justify-center text-base-content/40">
              <img src={user?.profile_image_url} alt={user?.name} />
            </div>
          </div>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className="textarea textarea-bordered textarea-lg w-full min-h-[68px] max-h-[320px] resize-none"
              placeholder="Write a comment..."
              aria-label="Write a comment"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-xs text-base-content/60">Be respectful — follow community guidelines</div>
              <div className="flex items-center gap-2">
                {updatingCommentId ? (
                  <>
                    <button onClick={cancelUpdatingComment} className="btn btn-ghost btn-sm btn-outline">
                      <RxCross2 /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={UpdateCommentApi}
                      disabled={comment.updateComment}
                      className={`btn btn-primary btn-sm flex items-center gap-2 ${
                        comment.updateComment ? "opacity-80" : ""
                      }`}>
                      {comment.updateComment ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        <FiSend />
                      )}
                      <span>{comment.updateComment ? "Updating..." : "Update"}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={createCommentApi}
                    disabled={comment?.createLoading}
                    className={`btn btn-primary btn-sm flex items-center gap-2 ${
                      comment?.createLoading ? "opacity-80" : ""
                    }`}>
                    {comment?.createLoading ? <span className="loading loading-spinner loading-md"></span> : <FiSend />}
                    <span>Comment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* comments list */}
      <div className="max-h-[56vh] overflow-auto pr-2 space-y-2">
        {/* empty state */}
        {detail?.data?.comments_count === 0 && !comments?.data?.length && !detail?.loading && (
          <div className="py-4 text-center bg-base-300">No Comment Yet</div>
        )}
        {/*  LOOPING COMMENTS */}
        {comments?.data?.length > 0 &&
          comments?.data.map((c) => (
            <CommentCard
              c={c}
              key={c.id}
              user={user}
              handleUpdateComment={handleUpdateComment}
              deleteCommentApi={deleteCommentApi}
            />
          ))}
        {/* load more */}
        <div className="pt-3 pb-6 text-center">
          {comments?.loading || detail?.loading ? (
            <div className="flex justify-center my-3">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <button
              onClick={FetchMoreCommentsApi}
              disabled={!comments?.pagination?.nextPageURL}
              className={`link link-hover link-primary text-sm ${
                !comments?.pagination?.nextPageURL ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {comments?.pagination?.nextPageURL ? "See More Comments" : "No more comments"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default GroupPostComment;
