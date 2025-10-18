import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationContext } from "../../Pages/Main/Layout/NavigationContext";

const ReturnBackButton = ({ defaultBackTo, className, except }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { previousPath } = useContext(NavigationContext);
  const handleBack = () => {
    if (
      window.history.length > 1 &&
      previousPath[0] !== location.pathname &&
      !(except === previousPath[0] || previousPath[0].includes(except))
    ) {
      return navigate(-1);
    }
    if (!except) {
      return navigate(defaultBackTo);
    }
    for (let i = 0; i < previousPath.length; i++) {
      if (!previousPath[i].includes(except)) {
        return navigate(previousPath[i]);
      } else if (i === previousPath.length - 1) {
        return navigate(defaultBackTo);
      }
    }
  };

  return (
    <div onClick={handleBack} className={`btn mb-2 z-10 by-white ${className}`} aria-label="Back" title="Back">
      <FaArrowLeft className="w-10 h-5" />
    </div>
  );
};

export default ReturnBackButton;
