import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../../Components/Feed/NavBar";
import gsap from "gsap";
import UserSideBar from "../../../Components/Common/UserSideBar";
import { NavigationProvider } from "./NavigationContext";

const Layout = () => {
  const navbarRef = useRef();
  const lastScrollRef = useRef(0);
  const sideBarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (lastScrollRef.current < window.scrollY) {
        gsap.to(navbarRef.current, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(navbarRef.current, {
          y: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      }
      lastScrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollRef]);

  return (
    <NavigationProvider>
      <div className="min-h-screen">
        {/* Spacer */}
        <div className="w-full h-[65px]"></div>

        {/* Navbar */}
        <div className="fixed top-0 inset-x-0 z-10" ref={navbarRef}>
          <NavBar />
        </div>

        {/* Page content */}

        <div className="flex">
          <div ref={sideBarRef}>
            <UserSideBar />
          </div>
          <Outlet className="flex-1" />
        </div>
      </div>
    </NavigationProvider>
  );
};

export default Layout;
