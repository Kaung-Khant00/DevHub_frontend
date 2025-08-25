import React, { useState } from "react";

const ImageWIthSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className={`relative`}>
      {!loaded && <div className="skeleton h-[250px] w-full"></div>}
      <img
        src={`${backendURL}/storage/${src}`}
        alt={alt}
        className={`transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWIthSkeleton;
