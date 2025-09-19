import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationContext } from "../../Pages/Main/Layout/NavigationContext";

const ReturnBackButton = ({ defaultBackTo, className, except }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { previousPath } = useContext(NavigationContext);
  const handleBack = () => {
    // If history length > 1, go back
    if (
      window.history.length > 1 &&
      previousPath !== location.pathname &&
      !(except === previousPath || previousPath.includes(except))
    ) {
      console.log("previous Path ::", previousPath);
      console.log("location Path ::", location.pathname);
      console.log("except ::", except);
      navigate(-1);
    } else {
      // fallback to profile page (or safe route)
      navigate(defaultBackTo);
    }
  };

  return (
    <div onClick={handleBack} className={`btn mb-2 z-10 by-white ${className}`} aria-label="Back" title="Back">
      <FaArrowLeft className="w-10 h-5" />
    </div>
  );
};

export default ReturnBackButton;
