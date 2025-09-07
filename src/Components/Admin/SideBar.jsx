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
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/user/userSlice";
import { Link } from "react-router-dom";

const SideBar = ({ showSideBar }) => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className={`relative transition-all duration-300 ease-in-out ${showSideBar ? "w-[65px]" : "w-60"}`}>
      <aside
        className={`absolute pt-3 h-full bg-info-content transition-all duration-300 ease-in-out overflow-hidden ${
          !showSideBar ? "w-0" : "w-[65px]"
        }`}>
        <ul className="menu text-white flex flex-col gap-2 items-center">
          {/* Dashboard */}
          <li>
            <a href="/admin/dashboard" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineHome className="text-2xl" />
            </a>
          </li>

          {/* Management */}
          <li>
            <a href="/admin/admins" className="flex justify-center p-2 rounded-md hover:bg-info">
              <RiAdminLine className="text-2xl" />
            </a>
          </li>
          <li>
            <Link to="/admin/users" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineUsers className="text-2xl" />
            </Link>
          </li>
          <li>
            <a href="/admin/posts" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineDocumentText className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="/admin/questions" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineQuestionMarkCircle className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="/admin/groups" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineCollection className="text-2xl" />
            </a>
          </li>
          <li>
            <Link to="/admin/group_creation_requests" className="flex justify-center p-2 rounded-md hover:bg-info">
              <MdLibraryAdd className="text-2xl" />
            </Link>
          </li>
          <li>
            <a href="/admin/reports" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineExclamationCircle className="text-2xl" />
            </a>
          </li>

          {/* Account */}
          <li>
            <a href="/admin/profile" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineUser className="text-2xl" />
            </a>
          </li>
          <li>
            <a href="/admin/settings" className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineCog className="text-2xl" />
            </a>
          </li>
          <li>
            <div onClick={handleLogout} className="flex justify-center p-2 rounded-md hover:bg-info">
              <HiOutlineLogout className="text-2xl" />
            </div>
          </li>
        </ul>
      </aside>
      {/*  side bar components and links goes here :)  */}
      <aside
        className={`absolute h-full bg-info-content transition-all duration-300 ease-in-out overflow-hidden ${
          showSideBar ? "w-0" : "w-60"
        }`}>
        <ul className="menu py-0 px-4 text-white w-full ">
          <li className="pt-8">
            <a href="/admin/dashboard" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineHome className="text-xl" />
              <span>Dashboard</span>
            </a>
          </li>

          {/* Management */}
          <li className="menu-title mt-4 text-blue-300">Management</li>
          <li>
            <a href="/admin/admins" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <RiAdminLine className="text-xl" />
              <span>Admins</span>
            </a>
          </li>

          <li>
            <Link to="/admin/users" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineUsers className="text-xl" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <a href="/admin/posts" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineDocumentText className="text-xl" />
              <span>Posts</span>
            </a>
          </li>
          <li>
            <a href="/admin/questions" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineQuestionMarkCircle className="text-xl" />
              <span>Questions</span>
            </a>
          </li>
          <li>
            <a href="/admin/groups" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineCollection className="text-xl" />
              <span>Groups</span>
            </a>
          </li>
          <li>
            <Link
              to="/admin/group_creation_requests"
              className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <MdLibraryAdd className="text-xl" />
              <span>Groups Requests</span>
            </Link>
          </li>
          <li>
            <a href="/admin/reports" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineExclamationCircle className="text-xl" />
              <span>Reports</span>
            </a>
          </li>

          {/* Account */}
          <li className="menu-title mt-4 text-blue-300">Account</li>
          <li>
            <a href="/admin/profile" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineUser className="text-xl" />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="/admin/settings" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <HiOutlineCog className="text-xl" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <div onClick={handleLogout} className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
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
