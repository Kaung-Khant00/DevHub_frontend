import { HiOutlineDocumentText } from "react-icons/hi";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";

export default function GroupCard({ group }) {
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
          <h1 className="font-bold text-lg">{group.name}</h1>
          <div className="text-sm text-gray-700">{group.description}</div>
          <div className="flex gap-1 py-3">
            {group.tags &&
              group.tags.map((tag) => <span className="badge badge-sm badge-soft badge-primary">{tag}</span>)}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="text-primary flex gap-2">
                <PiUsersThreeBold size={18} />
                10
              </div>
              <div className="text-primary flex gap-2">
                <HiOutlineDocumentText size={18} /> 10
              </div>
            </div>
            <div className="space-x-2">
              <button className="btn btn-sm btn-primary">Join</button>
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
