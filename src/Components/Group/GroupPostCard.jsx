import { useState } from "react";
import { FaCode, FaFile, FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deletePost } from "../../Redux/post/postSlice";
import { api } from "../../Services/axios_instance";
import Spinner from "../Common/Spinner";
import { likeGroupPost } from "../../Redux/group/groupPostsSlice";
import GroupPostCardAction from "../Common/GroupPostCardAction";

function PostCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, file, content, title, code, code_lang, followed, image, image_url, created_at_formatted } = post;
  const { user: authUser } = useSelector((state) => state.user);
  const likeLoading = useSelector((state) => state.groupPost.likeLoading);
  const [expand, setExpand] = useState(false);
  const [liked, setLiked] = useState(post?.liked || false);
  const LIMIT = 150;
  const isLong = content?.length > LIMIT;
  const displayText = expand ? content : content.substring(0, LIMIT) + (isLong ? "..." : "");

  const EditPostApi = () => {
    navigate(`/post/edit/${post.id}`);
  };

  function CreateLikeApi() {
    setLiked((pre) => !pre);
    dispatch(likeGroupPost(post.id));
  }

  function DeletePostApi() {
    dispatch(deletePost(post.id));
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
    <div className="justify-self-center my-2 card bg-base-100 border border-base-300 shadow-md w-full max-w-[650px] shrink-0">
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
          <GroupPostCardAction authUser={authUser} user={user} followed={followed} post={post} />
        </div>

        {/* Body */}
        <div>
          {/*           {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag.id} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          )} */}
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
            disabled={likeLoading}
            className={`flex items-center gap-2 text-sm cursor-pointer ${
              liked ? "text-primary" : "text-base-content/80"
            }`}>
            {likeLoading ? <Spinner size="sm" /> : <>{liked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}</>}
            <span>{post?.liked_users_count ?? 0}</span>
          </button>

          <Link
            to={`/group/${post?.id}/post/comments`}
            className="flex items-center gap-1 text-sm text-base-content/80 ">
            <FaRegCommentDots size={16} /> <span>Comments</span>
          </Link>

          {/*  <button className="ml-auto flex items-center gap-1 text-sm text-base-content/80 cursor-pointer">
            <PiShareFatBold /> <span>Share</span>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
