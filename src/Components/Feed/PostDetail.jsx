// DetailPostPage.jsx
import React, { useEffect, useState } from "react";
import {
  FaCode,
  FaFile,
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaUserCircle,
  FaClock,
  FaDownload,
  FaLink,
  FaFlag,
} from "react-icons/fa";
import { BsGraphUpArrow, BsThreeDotsVertical } from "react-icons/bs";
import { PiShareFatBold } from "react-icons/pi";
import PostComment from "./PostComment";
import { fetchDetailPost, likeDetailPost } from "../../Redux/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../Services/axios_instance";
import FollowButton from "./FollowButton";
import ImageWIthSkeleton from "./ImageWIthSkeleton";

export default function DetailPostPage() {
  const { data, loading, likeLoading } = useSelector(
    (state) => state.post.detail
  );
  const { user } = useSelector((state) => state.user);
  const [expand, setExpand] = useState(false);
  const [liked, setLiked] = useState(data?.liked);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (data) {
      setLiked(data?.liked);
    }
  }, [data]);
  /*  I fetch the detail post including comments from the backend :) */
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailPost(id));
    }
  }, [dispatch, id]);
  function handleLikePost() {
    setLiked((pre) => !pre);
    dispatch(likeDetailPost({ user_id: user?.id, post_id: id }));
  }

  const contentLimit = 280;
  const isLong = data?.content.length > contentLimit;
  const displayText = expand
    ? data?.content
    : data?.content.slice(0, contentLimit) + (isLong ? "…" : "");

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };
  async function handleFileDownload(path) {
    try {
      const response = await api.post(`/posts/download`, {
        path,
      });
      console.log(response);
      /*  I still understand what happen when I use Blob but I understand the rest of the code */
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", data?.file.name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <main className="lg:col-span-2 space-y-6">
          {/* Post card — expanded detail layout */}

          {loading ? (
            <div className="card-body p-5 rounded shadow-sm my-2 bg-white flex w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-50"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-8 w-2/3"></div>
              <div className="skeleton h-50 w-full"></div>
            </div>
          ) : (
            <article className="card bg-base-100 border border-base-300 shadow-md p-6">
              {/* Header */}
              <header className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 overflow-hidden">
                      {loading ? (
                        <div className="w-16 h-16 skeleton rounded-full"></div>
                      ) : (
                        <img
                          src={data?.user.profile_image_url}
                          alt={data?.user.name}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold leading-tight">
                        {data?.title}
                      </h1>
                    </div>
                    <div className="text-sm text-base-content/70 mt-1">
                      <span className="font-medium">{data?.user.name}</span>
                      <span className="mx-2">·</span>
                      {data?.user.main_career && (
                        <>
                          <span className="text-xs">
                            {data?.user.main_career}
                          </span>
                          <span className="mx-2">·</span>
                        </>
                      )}
                      <span className="text-xs text-base-content/60">
                        <FaClock className="inline mr-1" />
                        {data?.created_at_formatted}
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Body */}
              <section className="mt-4 space-y-4">
                <p className="text-base text-base-content/90 leading-relaxed whitespace-pre-line">
                  {displayText}
                  {isLong && (
                    <button
                      onClick={() => setExpand((s) => !s)}
                      className="ms-3 text-primary text-sm font-medium"
                    >
                      {expand ? "Show less" : "Show more"}
                    </button>
                  )}
                </p>

                {/* Code block */}
                <div className="mt-2 collapse collapse-open border border-base-200 bg-base-200/60 rounded-lg">
                  <div className="collapse-title text-sm font-medium flex items-center gap-2">
                    <FaCode /> Code snippet{" "}
                    <span className="ml-2 font-mono text-xs text-base-content/60">
                      ({data?.code_lang})
                    </span>
                  </div>
                  <div className="collapse-content p-0">
                    <pre className="max-w-full bg-base-100 p-4 rounded-b-lg overflow-auto text-sm font-mono whitespace-pre-wrap break-words">
                      <code>{data?.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <ImageWIthSkeleton
                    src={data?.image_url}
                    alt={data?.title}
                    className="w-full rounded-lg object-cover max-h-[420px]"
                  />
                </div>

                {/* File panel */}
                <div className="mt-2 flex items-center justify-between btn btn-ghost border border-base-300 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <FaFile />
                    <div>
                      <div className="font-medium">{data?.file.name}</div>
                      <div className="text-xs text-base-content/60">
                        {formatSize(data?.file.size)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="btn btn-outline btn-sm gap-2"
                      onClick={() => {
                        handleFileDownload(data?.file.path);
                      }}
                    >
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 pt-1 px-1">
                  <button
                    onClick={handleLikePost}
                    disabled={likeLoading}
                    className={`flex items-center gap-2 text-sm ${
                      liked ? "text-primary" : "text-base-content/80"
                    }`}
                  >
                    {likeLoading ? (
                      <div className="loading loading-spinner loading-sm"></div>
                    ) : (
                      <>
                        {liked ? (
                          <FaHeart size={16} />
                        ) : (
                          <FaRegHeart size={16} />
                        )}
                      </>
                    )}
                    <span>{data?.liked_users_count}</span>
                  </button>

                  <button className="ml-auto flex items-center gap-1 text-sm text-base-content/80 hover:text-base-content/40">
                    <PiShareFatBold /> <span>Share</span>
                  </button>
                </div>
              </section>
            </article>
          )}

          <PostComment />
        </main>
        {/* Right sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Quick Actions card */}
          <div className="card bg-base-100 border border-base-200 p-4 rounded-2xl">
            <div className="text-sm text-base-content/70">
              <div className="mb-2">
                <strong>Published</strong>
              </div>
              <div className="mb-3 text-xs">{data?.created_at_formatted}</div>

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
                    {data?.liked_users_count ?? 0}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaRegCommentDots className="text-base-content/60" />
                    <span>Comments</span>
                  </div>
                  <div className="font-medium">{data?.comments_count ?? 3}</div>
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

              {data?.user.id === user?.id ? (
                <button className="btn btn-primary btn-sm w-full col-span-2 flex items-center justify-center gap-2">
                  <BsGraphUpArrow />{" "}
                  <span className="text-xs">Analysis post</span>
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

          {/* Related Posts (unchanged) */}
          <div className="card bg-base-100 border border-base-200 p-4 rounded-2xl">
            <div className="font-semibold">Related Posts</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="block hover:underline">
                  Eloquent: Avoiding N+1
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  Optimizing Pivot Table Counts
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  Design Decisions for Comment Systems
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
