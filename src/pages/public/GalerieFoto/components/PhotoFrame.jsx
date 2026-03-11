import { useState } from "react";

/**
 * Photo frame with optional orientation. Orientation can be passed from parent or
 * detected on image load using naturalWidth/naturalHeight (no extra HTTP requests).
 * Optionally reports detected orientation via onOrientation(orientation).
 */
const PhotoFrame = ({
  photo,
  className = "",
  orientation: orientationProp,
  onOrientation,
}) => {
  const [orientation, setOrientation] = useState(null);

  function handleLoad(e) {
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;
    const ratio = width / height;

    let detected;
    if (ratio > 1.05) detected = "landscape";
    else if (ratio < 0.95) detected = "portrait";
    else detected = "square";

    setOrientation(detected);

    if (onOrientation) {
      onOrientation(detected);
    }
  }

  const effectiveOrientation = orientationProp ?? orientation;

  if (!photo) return null;

  return (
    <div
      className={`photo-frame ${effectiveOrientation || ""} ${className}`.trim()}
    >
      <img
        src={photo.src}
        alt={photo.alt ?? ""}
        onLoad={handleLoad}
      />
    </div>
  );
};

PhotoFrame.displayName = "PhotoFrame";
export default PhotoFrame;
