import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/user/userSlice";

const NavBar = () => {
  const { logoutLoading, user, loading } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li
              onClick={() => {
                navigate("/feed");
              }}
              className={location.pathname === "/feed" ? "active" : ""}
            >
              <a className="btn-purple">Feed</a>
            </li>
            <li className={location.pathname === "/group" ? "active" : ""}>
              <a className="btn-purple">Group</a>
            </li>
            <li className={location.pathname === "/qa" ? "active" : ""}>
              <a className="btn-purple">Q&A</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">DevHub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li
            onClick={() => {
              navigate("/feed");
            }}
            className={location.pathname === "/feed" ? "active" : ""}
          >
            <a className="btn-purple">Feed</a>
          </li>
          <li className={location.pathname === "/group" ? "active" : ""}>
            <a className="btn-purple">Group</a>
          </li>
          <li className={location.pathname === "/qa" ? "active" : ""}>
            <a className="btn-purple">Q&A</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="mx-3 flex gap-3">
          <button className="btn-purple p-2 rounded-full duration-200">
            <IoMdNotifications size={20} />
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {loading ? (
              <div className="skeleton w-10 rounded-full"></div>
            ) : (
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profile_image_url}
                />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"profile"} className="justify-between btn-purple">
                Profile
                <span className="badge">Developer</span>
              </Link>
            </li>
            <li>
              <a className="btn-purple">Setting</a>
            </li>
            <li onClick={handleLogout}>
              <a className="btn-purple">
                <div>Logout</div>
                {logoutLoading && (
                  <span className="loading loading-spinner text-primary"></span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
