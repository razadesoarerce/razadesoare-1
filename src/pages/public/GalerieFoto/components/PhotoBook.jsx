import { useRef, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./PhotoBook.css";

const PHOTOS_PER_PAGE = 4;

const Page = forwardRef(({ photos, getPlaceholderSrc }, ref) => (
  <div ref={ref} className="photo-book-page">
    <div className="photo-book-page-grid">
      {photos.map((photo, i) => (
        <div key={photo.id ?? i} className="photo-book-cell">
          <img
            src={photo.src}
            alt={photo.alt ?? ""}
            onError={(e) => {
              if (getPlaceholderSrc) e.target.src = getPlaceholderSrc(photo.id ?? i);
            }}
          />
        </div>
      ))}
    </div>
  </div>
));
Page.displayName = "Page";

const PhotoBook = ({ photos, width = 320, height = 420, className = "" }) => {
  const bookRef = useRef(null);
  const getPlaceholderSrc = useCallback((id) => `https://placehold.co/200x200/e5e7eb/6b7280?text=Photo+${id}`, []);

  const chunked = [];
  for (let i = 0; i < photos.length; i += PHOTOS_PER_PAGE) {
    chunked.push(photos.slice(i, i + PHOTOS_PER_PAGE));
  }
  while (chunked.length < 2) chunked.push([]);
  if (chunked.length % 2 !== 0) chunked.push([]);

  const handlePrev = () => {
    const pf = bookRef.current?.pageFlip?.();
    if (pf) pf.turnToPrevPage();
  };

  const handleNext = () => {
    const pf = bookRef.current?.pageFlip?.();
    if (pf) pf.turnToNextPage();
  };

  return (
    <div className={`photo-book-wrap ${className}`}>
      <HTMLFlipBook
        ref={bookRef}
        width={width}
        height={height}
        size="fixed"
        showCover={false}
        drawShadow
        flippingTime={900}
        usePortrait={false}
        minWidth={200}
        maxWidth={400}
        minHeight={280}
        maxHeight={560}
        className="photo-book"
      >
        {chunked.map((pagePhotos, i) => (
          <Page key={i} photos={pagePhotos} getPlaceholderSrc={getPlaceholderSrc} />
        ))}
      </HTMLFlipBook>
      <div className="photo-book-nav">
        <button type="button" className="photo-book-nav-btn" onClick={handlePrev} aria-label="Pagina anterioară">
          ‹ Anterior
        </button>
        <button type="button" className="photo-book-nav-btn" onClick={handleNext} aria-label="Pagina următoare">
          Următoarea ›
        </button>
      </div>
    </div>
  );
};

export default PhotoBook;
