import { useState } from "react";
import {
  FaCode,
  FaHeart,
  FaRegCommentDots,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import ImageWIthSkeleton from "./ImageWIthSkeleton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { user, content, title, code, image, created_at_formatted } = post;
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [expand, setExpand] = useState(false);
  const LIMIT = 50;
  const isLong = content.length > LIMIT;
  const displayText = expand
    ? content
    : content.substring(0, LIMIT) + (isLong ? "..." : "");

  const handleEditPost = () => {
    navigate(`/post/edit/${post.id}`);
  };

  const toggleLike = () => {
    setLiked((s) => !s);
    setLikes((v) => v + (liked ? -1 : 1));
  };

  return (
    <div className="my-2 card bg-base-100 border border-base-300 shadow-md w-full max-w-[650px] shrink-0">
      <div className="card-body p-5">
        {/* Header */}
        <div className="flex justify-between">
          {/*  Image Container */}
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-base-100 ring-offset-base-100">
                <img src={user?.profile_image_url} alt={user.name} />
              </div>
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-base-content/60">
                Posted in {created_at_formatted}
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle m-1">
              <BsThreeDotsVertical size={20} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {/* <li>
                <a>Save Post</a>
              </li> 
              <li>
                <a>Unfollow User</a>
              </li> */}
              {user.id === authUser?.id && (
                <li onClick={handleEditPost}>
                  <a>Edit Post</a>
                </li>
              )}

              <li>
                <a>Copy Link</a>
              </li>
              <li>
                <a>Share</a>
              </li>

              {user.id === authUser?.id ? (
                <li>
                  <a className="text-red-600 hover:bg-red-500 hover:text-white">
                    Delete this post
                  </a>
                </li>
              ) : (
                <li>
                  <a className="text-red-600 hover:bg-red-500 hover:text-white">
                    Report
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Body */}
        <h2 className="text-lg font-bold mt-2">{title}</h2>
        <p className="text-base-content/90 text-[18px] leading-relaxed">
          {displayText}
          {isLong && (
            <span
              className="cursor-pointer text-primary text-[17px] ms-3"
              onClick={() => setExpand(!expand)}
            >
              {expand ? "Show less" : "Show more"}
            </span>
          )}
        </p>

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
        {image && (
          <div className="mt-3 lg:px-1">
            <ImageWIthSkeleton
              src={image}
              alt={title}
              className="lg:max-h-[350px] max-h-[300px] w-full object-center object-cover rounded-lg"
            />
          </div>
        )}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={toggleLike}
            className={`btn ${
              liked ? "btn-error text-error-content" : "btn-ghost"
            }`}
          >
            {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />} {likes}
          </button>
          <button className="btn  btn-ghost">
            <FaRegCommentDots size={20} /> 10
          </button>
          <button className="btn btn-ghost">
            <PiShareFatBold size={20} />
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
