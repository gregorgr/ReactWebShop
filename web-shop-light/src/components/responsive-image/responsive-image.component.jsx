import React, { useState } from "react";

import "./responsive-image.styles.scss";

const ResponsiveImage = ({ src, title, className }) => {
  const [aspectClass, setAspectClass] = useState("");

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const aspectRatio = naturalWidth / naturalHeight;

    if (aspectRatio > 1.5) {
      setAspectClass("image-wide"); // Za ležeče slike
    } else if (aspectRatio < 0.75) {
      setAspectClass("image-tall"); // Za pokončne slike
    } else {
      setAspectClass("image-square"); // Za skoraj kvadratne slike
    }
  };

  return (
    <div className={`image-container ${aspectClass}`}>
      <img
        src={src}
        alt={title}
        title={title}
        onLoad={handleImageLoad}
        className={`responsive-img ${className}`}
      />
    </div>
  );
};

export default ResponsiveImage;
