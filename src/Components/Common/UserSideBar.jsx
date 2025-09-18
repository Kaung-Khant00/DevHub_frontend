import React from "react";
import { FaRss, FaUsers, FaQuestionCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const UserSideBar = () => {
  const location = useLocation();
  return (
    <div className="w-[250px] bg-white h-screen sticky top-0 pt-5 hidden lg:block">
      <ul className="menu w-full gap-1">
        <li className={`${location.pathname === "/feed" ? "active" : " "} w-full`}>
          <Link to={"/feed"}>
            <FaRss />
            Feed
          </Link>
        </li>
        <li className={`${location.pathname === "/group" ? "active" : " "} w-full`}>
          <Link to="/group" className="btn-purple w-full">
            <FaUsers /> Group
          </Link>
        </li>
        <li>
          <a>
            <FaQuestionCircle /> Questions
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserSideBar;
