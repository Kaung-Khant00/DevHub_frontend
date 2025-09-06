import SideBar from "../../Components/Admin/SideBar";
import NavBar from "../../Components/Admin/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Admin = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      <div className="h-[58px]">
        <NavBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      </div>

      <div style={{ height: "calc(100vh - 58px)" }} className="flex flex-1 max-h-full h-full">
        <SideBar showSideBar={showSideBar} />

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
