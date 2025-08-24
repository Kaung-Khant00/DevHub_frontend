import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../../Components/Feed/NavBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const navbarRef = useRef();

  useGSAP(() => {
    let lastScroll = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        const isScrollingDown = currentScroll > lastScroll;

        gsap.to(navbarRef.current, {
          yPercent: isScrollingDown ? -100 : 0,
          duration: 0.5,
          ease: "power1.out",
        });

        lastScroll = currentScroll;
      },
    });
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);
  return (
    <div className="min-h-screen">
      <div className="w-full h-[65px]"></div>
      <div className="fixed top-0 inset-x-0 z-10" ref={navbarRef}>
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
