import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineCollection,
  HiOutlineExclamationCircle,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";
import { MdLibraryAdd } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/user/userSlice";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ showSideBar }) => {
  const admin = useSelector((state) => state.admin.user.user.data);
  const dispatch = useDispatch();
  const location = useLocation();
  function handleLogout() {
    dispatch(logoutUser());
  }
  const isActive = (path) => location.pathname.includes(path);
  return (
    <div className={`relative transition-all duration-300 ease-in-out ${showSideBar ? "w-[65px]" : "w-60"}`}>
      <aside
        className={` absolute pt-3 h-full bg-base-300 transition-all duration-300 ease-in-out border-r border-gray-300 ${
          !showSideBar ? "w-0" : "w-[65px]"
        }`}>
        <ul className=" bgInfo menu text-gray-700 flex flex-col gap-2 items-center">
          {/* Dashboard */}
          {/*           <li className={isActive("/admin/dashboard") ? "active" : ""}>
            <Link
              to="/admin/dashboard"
              className="bg-gray-300 flex justify-center p-2 rounded-md hover:bg-info"
              title="Dashboard">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Dashboard">
                <HiOutlineHome className="text-2xl" />
              </span>
            </Link>
          </li> */}

          {/* Management */}
          {admin?.role === "SUPER_ADMIN" && (
            <li className={isActive("/admin/admins") ? "active" : ""}>
              <Link to="/admin/admins" className="flex justify-center p-2 rounded-md hover:bg-info" title="Admins">
                <span className="tooltip tooltip-right tooltip-info" data-tip="Admins">
                  <RiAdminLine className="text-2xl" />
                </span>
              </Link>
            </li>
          )}
          <li className={isActive("/admin/users") ? "active" : ""}>
            <Link to="/admin/users" className="flex justify-center p-2 rounded-md hover:bg-info" title="Users">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Users">
                <HiOutlineUsers className="text-2xl" />
              </span>
            </Link>
          </li>
          {/*  <li className={isActive("/admin/posts") ? "active" : ""}>
            <Link to="/admin/posts" className="flex justify-center p-2 rounded-md hover:bg-info" title="Posts">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Posts">
                <HiOutlineDocumentText className="text-2xl" />
              </span>
            </Link>
          </li> */}
          {/* <li className={isActive("/admin/questions") ? "active" : ""}>
            <Link to="/admin/questions" className="flex justify-center p-2 rounded-md hover:bg-info" title="Questions">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Questions">
                <HiOutlineQuestionMarkCircle className="text-2xl" />
              </span>
            </Link>
          </li> */}
          {/* <li className={isActive("/admin/groups") ? "active" : ""}>
            <Link to="/admin/groups" className="flex justify-center p-2 rounded-md hover:bg-info" title="Groups">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Groups">
                <HiOutlineCollection className="text-2xl" />
              </span>
            </Link>
          </li> */}
          <li className={isActive("/admin/group_creation_requests") ? "active" : ""}>
            <Link
              to="/admin/group_creation_requests"
              className="flex justify-center p-2 rounded-md hover:bg-info"
              title="Group Requests">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Group Requests">
                <MdLibraryAdd className="text-2xl" />
              </span>
            </Link>
          </li>
          <li className={isActive("/admin/reports") ? "active" : ""}>
            <Link to="/admin/reports" className="flex justify-center p-2 rounded-md hover:bg-info" title="Reports">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Reports">
                <HiOutlineExclamationCircle className="text-2xl" />
              </span>
            </Link>
          </li>

          {/* Account */}
          {/* <li className={isActive("/admin/profile") ? "active" : ""}>
            <Link to="/admin/profile" className="flex justify-center p-2 rounded-md hover:bg-info" title="Profile">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Profile">
                <HiOutlineUser className="text-2xl" />
              </span>
            </Link>
          </li> */}
          {/* <li className={isActive("/admin/settings") ? "active" : ""}>
            <Link to="/admin/settings" className="flex justify-center p-2 rounded-md hover:bg-info" title="Settings">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Settings">
                <HiOutlineCog className="text-2xl" />
              </span>
            </Link>
          </li> */}
          <li>
            <div onClick={handleLogout} className="flex justify-center p-2 rounded-md hover:bg-info" title="Logout">
              <span className="tooltip tooltip-right tooltip-info" data-tip="Logout">
                <HiOutlineLogout className="text-2xl" />
              </span>
            </div>
          </li>
        </ul>
      </aside>
      {/*  side bar components and links goes here :)  */}
      <aside
        className={`absolute h-full bg-base-300 transition-all duration-300 ease-in-out overflow-y-auto border-r border-gray-300 ${
          showSideBar ? "w-0" : "w-60"
        }`}>
        <ul className="menu py-0 px-4 w-full ">
          {/*           <li className="pt-8">
            <a href="/admin/dashboard" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineHome className="text-xl" />
              <span>Dashboard</span>
            </a>
          </li> */}

          {/* Management */}
          <li className="menu-title mt-4 text-blue-300">Management</li>

          {admin?.role == "SUPER_ADMIN" && (
            <li>
              <details>
                <summary className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
                  <RiAdminLine className="text-xl" />
                  <span>Admins</span>
                </summary>
                <ul>
                  <li>
                    <Link to={"/admin/admins"}>Admin List</Link>
                  </li>

                  {/* <li>
                    <a>Admin Actions</a>
                  </li> */}
                  <li>
                    <Link to="/admin/admins/create">Create Admin</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
          <li>
            <Link to="/admin/users" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineUsers className="text-xl" />
              <span>Users</span>
            </Link>
          </li>
          {/* <li>
            <a href="/admin/posts" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineDocumentText className="text-xl" />
              <span>Posts</span>
            </a>
          </li> */}
          {/* <li>
            <a href="/admin/questions" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineQuestionMarkCircle className="text-xl" />
              <span>Questions</span>
            </a>
          </li> */}
          {/* <li>
            <a href="/admin/groups" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineCollection className="text-xl" />
              <span>Groups</span>
            </a>
          </li> */}
          <li>
            <Link to="/admin/group_creation_requests" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <MdLibraryAdd className="text-xl" />
              <span>Groups Requests</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineExclamationCircle className="text-xl" />
              <span>Reports</span>
            </Link>
          </li>

          {/* Account */}
          <li className="menu-title mt-4 text-blue-300">Account</li>
          {/* <li>
            <a href="/admin/profile" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineUser className="text-xl" />
              <span>Profile</span>
            </a>
          </li> */}
          {/* <li>
            <a href="/admin/settings" className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineCog className="text-xl" />
              <span>Settings</span>
            </a>
          </li> */}
          <li>
            <div onClick={handleLogout} className="flex items-center gap-2 hover:bg-info p-2 rounded-md">
              <HiOutlineLogout className="text-xl" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
