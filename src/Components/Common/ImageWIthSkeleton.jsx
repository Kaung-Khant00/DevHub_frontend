import { useState } from "react";

const ImageWIthSkeleton = ({ src, alt, className, skeletonClassName }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className={`skeleton ${skeletonClassName ? skeletonClassName : "w-full h-full"}`}></div>}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ImageWIthSkeleton;
