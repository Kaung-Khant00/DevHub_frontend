import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { useSelector } from "react-redux";

const CommentCard = ({ c, user, handleUpdateComment, deleteCommentApi }) => {
  const deleteLoading = useSelector((state) => state.groupPost.comment.deleteLoading);
  return (
    <article key={c.id} className="flex gap-4 p-3 rounded-lg border border-base-200 hover:shadow-sm transition-shadow">
      <div className="avatar shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-base-200">
          <img src={c.user?.profile_image_url} alt={c.user?.name} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <a className="font-semibold hover:underline" href={`#/u/${c.user?.id}`}>
                {c.user?.name}
                {c?.user?.id === user?.id && <span className="px-2 text-sm text-base-content/60">You</span>}
              </a>
              <span className="text-xs text-base-content/60">{c.created_at_formatted}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">{c.comment}</p>
          </div>

          <button aria-label="comment actions" className="text-base-content/60 hover:text-base-content" title="More">
            <div className="dropdown dropdown-bottom dropdown-end ">
              <div tabIndex={0} role="button" className=" m-1">
                <BsThreeDotsVertical className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm border border-base-300 bg-base-200">
                {c.user?.id === user?.id && (
                  <>
                    <li>
                      <div onClick={() => handleUpdateComment(c.comment, c.id)}>
                        <FiEdit />
                        <span>Update</span>
                      </div>
                    </li>
                    <li>
                      <div
                        disabled={deleteLoading}
                        onClick={() => {
                          deleteCommentApi(c.id);
                        }}
                        className="text-red-500 active:!bg-red-500 active:text-white">
                        {deleteLoading ? <span className="loading loading-spinner loading-md"></span> : <FiTrash2 />}
                        <span>Delete</span>
                      </div>
                    </li>
                  </>
                )}
                {c.user?.id !== user?.id && (
                  <li>
                    <div className="text-red-500 active:!bg-red-500 active:text-white">
                      <GoReport /> Report
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-base-content/60">
          {/* <button className="btn btn-ghost btn-sm gap-2 normal-case">
            <FaRegHeart />
            <span>{c.likes_count ?? 0}</span>
          </button> 
          <button className="btn btn-ghost btn-sm normal-case">Report</button>
          */}
        </div>
      </div>
    </article>
  );
};

export default CommentCard;
