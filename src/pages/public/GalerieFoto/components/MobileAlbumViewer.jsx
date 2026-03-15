import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import "./MobileAlbumViewer.css";

const SWIPE_DOWN_THRESHOLD = 120;
const MAX_HORIZONTAL_FOR_CLOSE = 80;

/**
 * Mobile-only swipe gallery for album photos.
 * Used when viewport < 768px instead of the flipbook.
 * Supports pinch zoom, double-tap zoom, image counter, swipe down to close.
 */
const MobileAlbumViewer = ({ photos, onClose }) => {
  const list = photos ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback(
    (e) => {
      if (!onClose) return;
      const t = e.touches?.[0];
      if (t) {
        touchStartRef.current = { x: t.clientX, y: t.clientY };
      }
    },
    [onClose]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      if (!onClose) return;
      const t = e.changedTouches?.[0];
      if (!t) return;
      const { x: startX, y: startY } = touchStartRef.current;
      const deltaY = t.clientY - startY;
      const deltaX = Math.abs(t.clientX - startX);
      if (deltaY > SWIPE_DOWN_THRESHOLD && deltaX < MAX_HORIZONTAL_FOR_CLOSE) {
        onClose();
      }
    },
    [onClose]
  );

  if (list.length === 0) return null;

  return (
    <div
      className="mobile-album-viewer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Swiper
        modules={[Zoom]}
        zoom={true}
        spaceBetween={20}
        slidesPerView={1}
        className="mobile-album-swiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {list.map((photo, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container">
              <div className="mobile-album-slide">
                <img src={photo.src} alt={photo.alt || ""} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mobile-album-counter" aria-live="polite">
        {activeIndex + 1} / {list.length}
      </div>
    </div>
  );
};

export default MobileAlbumViewer;
