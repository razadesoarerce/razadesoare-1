import { useState } from "react";

/**
 * Photo frame with optional orientation. Uses object-fit: cover; images do not overflow.
 * orientation: "landscape" | "portrait" | undefined (auto-detect on load)
 */
function PhotoFrame({ photo, className = "", orientation: orientationProp }) {
  const [detectedOrientation, setDetectedOrientation] = useState(null);
  const orientation = orientationProp ?? detectedOrientation;
  const orientationClass = orientation ? `frame-${orientation}` : "";

  if (!photo) return null;

  return (
    <div className={`photo-frame ${orientationClass} ${className}`.trim()}>
      <img
        src={photo.src}
        alt={photo.alt ?? ""}
        onLoad={(e) => {
          if (orientationProp) return;
          const { naturalWidth: w, naturalHeight: h } = e.target;
          setDetectedOrientation(w >= h ? "landscape" : "portrait");
        }}
      />
    </div>
  );
}

export default PhotoFrame;
