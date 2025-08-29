import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterSortPosts } from "../../Redux/user/userSlice";

const ProfilePostSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user.userPosts);
  function handleSearch() {
    dispatch(filterSortPosts({ searchQuery, sortBy }));
  }
  function handleSorting(sort) {
    setSortBy(sort);
    dispatch(filterSortPosts({ searchQuery, sortBy: sort }));
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 rounded-2xl">
      <div className="card-body p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="card-title text-lg">My Posts ( {data?.length} )</h2>
          <div className="flex items-center gap-2">
            <div className="join">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  e.key === "Enter" && handleSearch();
                }}
                placeholder="Search my posts…"
                className="input input-sm input-bordered join-item w-48 md:w-64"
              />
              <div className="dropdown dropdown-end join-item">
                <div tabIndex={0} role="button" className="btn btn-sm">
                  Sort <FaChevronDown size={16} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                >
                  <li>
                    <button
                      className={sortBy === "desc" ? "menu-active" : ""}
                      onClick={() => handleSorting("desc")}
                    >
                      Latest
                    </button>
                  </li>
                  <li>
                    <button
                      className={sortBy === "asc" ? "menu-active" : ""}
                      onClick={() => handleSorting("asc")}
                    >
                      Oldest
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostSearch;
