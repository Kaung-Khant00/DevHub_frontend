import { useState } from "react";
import {
  FaCode,
  FaHeart,
  FaRegCommentDots,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";
import { PiShareFat, PiShareFatBold } from "react-icons/pi";

function PostCardPlain({
  author = "Anonymous",
  avatar,
  tag = "General",
  title = "No Title",
  body = "No content provided",
  code = "blablabla \n babnanan",
  likesDefault = 0,
  image = "https://i.pravatar.cc/100",
  replies = 0,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likesDefault);

  const toggleLike = () => {
    setLiked((s) => !s);
    setLikes((v) => v + (liked ? -1 : 1));
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden w-full shrink-0 w-full">
      <div className="card-body p-5">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
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
              <div className="text-sm text-base-content/60">
                Posted in {tag}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <button
              onClick={toggleLike}
              className={`btn btn-sm w-[50px] ${
                liked ? "btn-error text-error-content" : "btn-ghost"
              }`}
            >
              {liked ? <FaHeart size={20} /> : <FaRegHeart />} {likes}
            </button>
            <button className="btn btn-sm btn-ghost w-[50px]">
              <FaRegCommentDots /> {replies}
            </button>
            <button className="btn btn-sm btn-ghost w-[50px]">
              <PiShareFatBold />
            </button>
          </div>
        </div>

        {/* Body */}
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
        {image && (
          <div className="mt-3 lg:px-1">
            <img
              src={image}
              alt={title}
              className="lg:max-h-[350px] max-h-[300px] w-full object-center object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCardPlain;

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
