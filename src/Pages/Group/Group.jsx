import { FaSearch, FaPlus, FaSlidersH } from "react-icons/fa";
import GroupCard from "../../Components/Group/GroupCard";
import { Link } from "react-router-dom";

export default function GroupsPage() {
  return (
    <div className="p-6 md:p-10 min-h-screen bg-base-200">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">Groups</h1>
            <p className="text-sm text-muted mt-1">Discover communities, follow groups, and build your network.</p>
          </div>

          <div className="flex gap-2 items-center">
            <button className="btn btn-outline btn-sm">
              <FaSlidersH className="mr-2" /> Filters
            </button>
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
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search groups by name or description..."
                  className="input input-bordered w-full pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm">
                  <FaSearch />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <select defaultValue="Sort By" className="select">
                  <option disabled>Sort By</option>
                  <option value="popular">Most members</option>
                  <option value="newest">Newest</option>
                  <option value="alphabet">A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
