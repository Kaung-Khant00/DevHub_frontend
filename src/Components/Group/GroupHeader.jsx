import { FaUsers } from "react-icons/fa";
import ImageWIthSkeleton from "../Common/ImageWIthSkeleton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinGroup } from "../../Redux/group/groupSlice";

const GroupHeader = ({ group, admin }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?.id);

  function joinGroupApi() {
    dispatch(joinGroup(group.id));
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md mb-6 bg-base-100 relative">
      <div className="relative h-44 bg-gradient-to-t from-black to-transparent ">
        <ImageWIthSkeleton
          src={group?.image_url}
          alt="group cover"
          className={"absolute inset-0 w-full h-full object-cover opacity-75"}
        />
      </div>

      {/* Overlap content */}
      <div className="p-5 flex items-start gap-5 ">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg ring ring-primary/30 overflow-hidden">
            <a href="#group" title="Open group" className="block w-full h-full">
              <img src={group?.image_url} alt="group avatar" className="w-full h-full object-cover" />
            </a>
          </div>
        </div>

        <div className="flex-1 ">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold leading-tight">{group?.name}</h1>
              <p className="text-sm text-muted mt-1">{group?.description}</p>

              <div className="mt-3 flex items-center gap-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <FaUsers className="mt-0.5 text-primary" />
                  <span className="text-base-content">
                    {group?.members_count} member{group?.members_count > 1 && "s"}
                  </span>
                </div>

                <div className="ml-3 text-sm">
                  <span className="font-medium">Created:</span> <span className="text-muted">{group?.created_at}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {admin?.id !== userId ? (
                <>
                  <button className={`btn btn-primary ${!group?.joined && "btn-soft"}`} onClick={joinGroupApi}>
                    {group?.joined ? "Joined" : "Join"}
                  </button>
                  <button className="btn btn-primary">Message</button>
                </>
              ) : (
                <div className="badge badge-primary"> Admin</div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {group?.tags &&
              group.tags.map((t) => (
                <div key={t} className="badge badge-outline">
                  {t}
                </div>
              ))}
          </div>
        </div>

        {/* Compact admin bubble attached to header (smaller) */}
        {admin?.id !== userId && (
          <div className="absolute right-4 top-28 transform translate-y-1/2">
            <Link
              to={`/profile/${admin?.id}`}
              title={`View ${admin?.name} profile`}
              className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full ring ring-primary/30 overflow-hidden cursor-pointer">
                <ImageWIthSkeleton src={admin?.profile_url} alt={admin?.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-sm badge badge-primary badge-soft">
                <div className="font-medium ">{admin?.name}</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupHeader;
