import { useRef, useState, useEffect } from "react";
import "./AlbumStage.css";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 600;

const AlbumStage = ({ children }) => {
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const updateScale = () => {
      const containerWidth = el.clientWidth;
      const containerHeight = el.clientHeight;
      const scaleX = containerWidth / BASE_WIDTH;
      const scaleY = containerHeight / BASE_HEIGHT;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="album-stage">
      <div className="album-table">
        <div className="album-inner" ref={innerRef}>
          <div
            className="album-scale-wrapper"
            style={{ transform: `scale(${scale})` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumStage;
