// NavigationContext.js
import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState([]);
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    setPreviousPath((pre) => [currentPath.current, ...pre]);
    currentPath.current = location.pathname;
  }, [location.pathname]);

  return <NavigationContext.Provider value={{ previousPath }}>{children}</NavigationContext.Provider>;
};
