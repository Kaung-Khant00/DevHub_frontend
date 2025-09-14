import { HiOutlineDocumentText } from "react-icons/hi";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { joinGroup } from "../../Redux/group/groupSlice";
import { useState } from "react";
import Spinner from "../../Components/Common/Spinner";
import { toast } from "react-toastify";

export default function GroupCard({ group }) {
  const dispatch = useDispatch();
  const [joinLoading, setJoinLoading] = useState(false);
  const userId = useSelector((state) => (state.user.user ? state.user.user.id : null));

  const joinGroupApi = async () => {
    if (group.joined) {
      return toast.error("You are already a member of this group!");
    }
    setJoinLoading(true);
    try {
      await dispatch(joinGroup(group.id)).unwrap();
    } finally {
      setJoinLoading(false);
    }
  };
  return (
    <div className="bg-base-100 p-4 rounded shadow-sm">
      <div className="flex">
        <ImageWIthSkeleton
          src={group.image_url}
          alt="group image"
          className={"w-32 h-32 object-cover"}
          skeletonClassName={"w-32 h-32 absolute"}
        />

        <div className="ps-3 flex-2">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg">{group.name}</h1>
            {group.user_id == userId && <span className="badge badge-primary">Owner</span>}{" "}
          </div>
          <div className="text-sm text-gray-700">{group.description}</div>
          <div className="flex gap-1 py-3">
            {group.tags &&
              group.tags.map((tag, index) => (
                <span key={index} className="badge badge-sm badge-soft badge-primary">
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="text-primary flex gap-2">
                <PiUsersThreeBold size={18} />
                {group?.members_count}
              </div>
              <div className="text-primary flex gap-2">
                <HiOutlineDocumentText size={18} /> 10
              </div>
            </div>
            <div className="space-x-2">
              {userId && group.user_id != userId && (
                <button
                  onClick={joinGroupApi}
                  className={`w-20 btn btn-sm btn-primary ${!group?.joined && "btn-soft"}`}>
                  {joinLoading && <Spinner size="sm" />}
                  {group?.joined ? "Joined" : "Join"}
                </button>
              )}

              <Link to={`/group/${group.id}`} className="btn btn-sm btn-soft btn-primary">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
