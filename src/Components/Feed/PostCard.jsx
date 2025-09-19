import { useState } from "react";
import { FaCode, FaFile, FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../Redux/post/postSlice";
import { api } from "../../Services/axios_instance";
import Spinner from "../Common/Spinner";
import PostCardAction from "../Common/PostCardAction";
import { followUser } from "../../Redux/post/postSlice";

function PostCard({ post, isInProfile = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, file, content, title, code, code_lang, followed, image, image_url, created_at_formatted } = post;
  const { user: authUser } = useSelector((state) => state.user);
  const likeLoading = useSelector((state) => state.post.like.loading);
  const [expand, setExpand] = useState(false);
  /*  I am making for better UX so the like button response immediately after I click the like  */
  /*  And the data request will send to the backend site  */
  const [liked, setLiked] = useState(post?.liked || false);
  const LIMIT = 150;
  const isLong = content.length > LIMIT;
  const displayText = expand ? content : content.substring(0, LIMIT) + (isLong ? "..." : "");

  const EditPostApi = () => {
    navigate(`/post/edit/${post.id}`);
  };

  function CreateLikeApi() {
    setLiked((pre) => !pre);
    if (isInProfile) {
      dispatch(
        likePost({
          likeData: { post_id: post.id, user_id: authUser.id },
          isInProfile: user.id === authUser.id ? "myProfile" : "othersProfile",
        })
      );
    } else {
      dispatch(
        likePost({
          likeData: { post_id: post.id, user_id: authUser.id },
        })
      );
    }
  }

  function DeletePostApi() {
    dispatch(deletePost(post.id));
  }
  function FollowUserApi() {
    if (user.id) {
      dispatch(followUser({ userId: user.id }));
    }
  }
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
      link.setAttribute("download", file?.name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="my-2 card bg-base-100 border border-base-300 shadow-md w-full max-w-[650px] shrink-0">
      <div className="flex flex-col gap-2 p-5">
        {/* Header */}
        <div className="flex justify-between">
          {/*  Image Container */}
          <div className="flex items-center gap-3">
            <Link to={user?.id === authUser?.id ? `/profile` : `/profile/${user?.id}`} className="avatar">
              <div className="w-12 rounded-full ring ring-base-100 ring-offset-base-100">
                <img src={user?.profile_image_url} alt={user?.name} />
              </div>
            </Link>
            <div>
              <div className="font-semibold">{user?.name}</div>
              <div className="text-sm text-base-content/60">Posted in {created_at_formatted}</div>
            </div>
          </div>
          <PostCardAction
            authUser={authUser}
            DeletePostApi={DeletePostApi}
            EditPostApi={EditPostApi}
            FollowUserApi={FollowUserApi}
            user={user}
            followed={followed}
            post={post}
          />
        </div>

        {/* Body */}
        <div>
          <h2 className="text-lg font-bold mt-2">{title}</h2>
          <p className="text-base-content/90 text-base leading-relaxed">
            {displayText}
            {isLong && (
              <span className="cursor-pointer text-primary text-[17px] ms-3" onClick={() => setExpand(!expand)}>
                {expand ? "Show less" : "Show more"}
              </span>
            )}
          </p>
        </div>

        {code && (
          <div className="collapse collapse-arrow border border-base-300 bg-base-200/60 mt-1 ">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium flex items-center gap-2">
              <FaCode /> View code <span className="font-extrabold ">{code_lang}</span> snippet
            </div>
            <div className="collapse-content">
              <pre className="max-w-full bg-base-content p-2 rounded-lg overflow-x-auto text-sm text-base-300 whitespace-pre-wrap break-words">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        )}
        {image && (
          <div className="mt-1 lg:px-1">
            <ImageWIthSkeleton
              src={image_url}
              alt={title}
              className="lg:max-h-[350px] max-h-[300px] w-full object-center object-cover rounded-lg"
              skeletonClassName={"h-[300px]"}
            />
          </div>
        )}

        {/*
          Downloadable file (uploaded by another developer).
          Placed after media and before action buttons so it's prominent and accessible.
          Expects a `file` object like: { url, name, size }.
        */}
        {file && (
          <div className="mt-1 flex justify-between btn btn-outline w-full rounded-lg border-base-300 hover:border-base-400">
            <div className=" justify-start gap-3 p-3 flex items-center">
              <FaFile />
              <div className="">
                <div className="font-medium">{file.name}</div>
              </div>
              <div className="text-xs text-base-content/60">
                {file.size ? (
                  <>
                    {file.size < 1024
                      ? `${file.size} Bytes`
                      : file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : `${(file.size / 1024 / 1024).toFixed(1)} MB`}
                  </>
                ) : (
                  "Download file"
                )}
              </div>
            </div>
            <div
              onClick={() => {
                handleFileDownload(file.path);
              }}
              className="text-primary hover:underline">
              Download File
            </div>
            {/*  <a
              href={file.file_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Click here   download
            </a> */}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={CreateLikeApi}
            className={`flex items-center gap-2 text-sm cursor-pointer ${
              liked ? "text-primary" : "text-base-content/80"
            }`}>
            {likeLoading ? <Spinner size="sm" /> : <>{liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}</>}
            <span>{post?.liked_users_count ?? 0}</span>
          </button>

          <Link to={`/post/${post?.id}/comments`} className="flex items-center gap-1 text-sm text-base-content/80 ">
            <FaRegCommentDots size={16} /> <span>Comments</span>
          </Link>

          <button className="ml-auto flex items-center gap-1 text-sm text-base-content/80 cursor-pointer">
            <PiShareFatBold /> <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

/* import { useState } from "react";
import {
  FaCode,
  FaHeart,
  FaRegCommentDots,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";

function PostCardGradient({
  author = "Anonymous",
  avatar,
  tag = "General",
  title = "No Title",
  body = "No content provided",
  code,
  likesDefault = 0,
  replies = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likesDefault);

  const toggleLike = () => {
    setLiked((s) => !s);
    setLikes((v) => v + (liked ? -1 : 1));
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-lg overflow-hidden">
      <div className="h-12 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20" />

      <div className="card-body p-5">
        <div className="flex items-center gap-3 -mt-6">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-base-100 ring-offset-base-100">
              <img
                src={avatar || `https://i.pravatar.cc/100?u=${author}`}
                alt={author}
              />
            </div>
          </div>
          <div>
            <div className="font-semibold">{author}</div>
            <div className="text-sm text-base-content/60">Posted in {tag}</div>
          </div>
        </div>

        <h2 className="text-lg font-bold mt-2">{title}</h2>
        <p className="text-base-content/80 leading-relaxed">{body}</p>

        {code && (
          <div className="collapse collapse-arrow border border-base-300 bg-base-200/60 mt-3">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium flex items-center gap-2">
              <FaCode /> View code snippet
            </div>
            <div className="collapse-content">
              <pre className="bg-base-300/60 p-3 rounded-lg overflow-x-auto text-sm">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={toggleLike}
            className={`btn btn-sm w-full ${
              liked ? "btn-error text-error-content" : "btn-ghost"
            }`}
          >
            {liked ? <FaHeart /> : <FaRegHeart />} {likes}
          </button>
          <button className="btn btn-sm btn-ghost w-full">
            <FaRegCommentDots /> {replies}
          </button>
          <button className="btn btn-sm btn-ghost w-full">
            <FaShareAlt /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCardGradient;
 */
