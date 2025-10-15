import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaSlidersH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroupRequest } from "../../Redux/user/notificationSlice";
import GroupContainer from "../../Components/Group/GroupContainer";
import { fetchGroups } from "../../Redux/group/groupSlice";

export default function GroupsPage() {
  const groupCreationRequests = useSelector((state) => state.notification.groupRequest.data);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  function searchGroupApi() {
    dispatch(fetchGroups({ searchQuery }));
  }

  useEffect(() => {
    if (groupCreationRequests.length === 0) {
      dispatch(fetchGroupRequest());
    }
    dispatch(fetchGroups({}));
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-base-200 w-full">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Groups</h1>
          <p className="text-sm text-muted mt-1">Discover communities, follow groups, and build your network.</p>
        </div>

        <div className="flex gap-2 items-center">
          <Link to={"/group/requests"} className="btn btn-primary btn-outline btn-sm">
            Your Requests (<b>{groupCreationRequests.length || 0}</b>)
          </Link>
          <Link to={"/group/create"} className="btn btn-primary btn-sm flex items-center">
            <FaPlus className="mr-2" /> Create Group
          </Link>

          <div className="dropdown dropdown-end">
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>My Groups</a>
              </li>
              <li>
                <a>Invitations</a>
              </li>
              <li>
                <a>Group Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* search & controls */}
      <div className="bg-base-100 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1 flex items-center space-x-3">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search groups by name or description..."
                className="input input-bordered w-full pr-10 rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  e.key === "Enter" && searchGroupApi();
                }}
              />
              <button onClick={searchGroupApi} className="btn rounded-l-none">
                <FaSearch />
              </button>
            </div>

            <select
              defaultValue="Sort By"
              className="select"
              onChange={(e) => dispatch(fetchGroups({ sortBy: e.target.value, searchQuery }))}>
              <option disabled>Sort By</option>
              <option value="members_count,desc">Most members</option>
              <option value="posts_count,desc">Most posts</option>
            </select>
          </div>
        </div>
      </div>
      <GroupContainer />
    </div>
  );
}
