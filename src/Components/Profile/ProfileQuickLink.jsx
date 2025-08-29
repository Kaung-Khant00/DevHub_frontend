import { FaBell, FaFolder, FaUsers } from "react-icons/fa";

const ProfileQuickLink = () => {
  return (
    <div className="mt-4 flex w-full bg-white rounded shadow-sm">
      <div className="tabs flex-col md:flex-row tabs-boxed w-full">
        <a
          className="btn tab flex-1 font-bold hover:bg-primary/20"
          href="/followers"
        >
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaUsers />
          </div>{" "}
          <span className="text-primary">Followers</span>
        </a>
        <a
          className="tab flex-1 btn font-bold text-primary hover:bg-primary/20"
          href="/groups/joined"
        >
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaFolder />
          </div>{" "}
          <span className="text-primary">Joined Groups</span>
        </a>
        <a className="tab flex-1 btn hover:bg-primary/20" href="/notifications">
          <div className="flex-none w-11 h-11 rounded-xl text-primary flex items-center justify-center text-lg">
            <FaBell />
          </div>
          <span className="text-primary"> Notifications</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileQuickLink;
