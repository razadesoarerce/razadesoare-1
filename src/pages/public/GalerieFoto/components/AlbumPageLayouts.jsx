import { forwardRef, useState, useEffect } from "react";
import PhotoFrame from "./PhotoFrame";

function splitPanorama(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      const canvasLeft = document.createElement("canvas");
      const canvasRight = document.createElement("canvas");

      const half = Math.floor(width / 2);

      canvasLeft.width = half;
      canvasLeft.height = height;

      canvasRight.width = half;
      canvasRight.height = height;

      const ctxLeft = canvasLeft.getContext("2d");
      const ctxRight = canvasRight.getContext("2d");

      ctxLeft.drawImage(img, 0, 0, half, height, 0, 0, half, height);
      ctxRight.drawImage(img, half, 0, half, height, 0, 0, half, height);

      resolve({
        left: canvasLeft.toDataURL(),
        right: canvasRight.toDataURL(),
      });
    };

    img.onerror = () => resolve({ left: src, right: src });
  });
}

/**
 * Cover page: displays cover image (image 9) before the album opens.
 */
export const CoverPage = forwardRef(({ coverPhoto }, ref) => (
  <div ref={ref} className="album-page layout-cover">
    {coverPhoto && (
      <div className="photo-frame">
        <img src={coverPhoto.src} alt={coverPhoto.alt || "cover"} />
      </div>
    )}
  </div>
));
CoverPage.displayName = "CoverPage";

/**
 * Title page: left page of first spread. Displays album message.
 */
export const TitlePage = forwardRef(({ text = "" }, ref) => (
  <div ref={ref} className="album-page album-title-page">
    <div className="album-title-inner">
      <h2 className="album-title-text">{text}</h2>
    </div>
  </div>
));
TitlePage.displayName = "TitlePage";

/**
 * Portrait page: one portrait image centered, 3:4 ratio, photo frame.
 */
export const PortraitPage = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-portrait-single">
    <div className="layout-portrait-single-inner">
      {photos?.[0] && (
        <div className="photo-frame">
          <img src={photos[0].src} alt={photos[0].alt || ""} />
        </div>
      )}
    </div>
  </div>
));
PortraitPage.displayName = "PortraitPage";

/**
 * Landscape page: two landscape photos stacked vertically, 4:3, gap between frames.
 */
export const LandscapePage = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-landscape-stack">
    <div className="layout-landscape-stack-inner">
      {photos?.[0] && (
        <div className="photo-frame">
          <img src={photos[0].src} alt={photos[0].alt || ""} />
        </div>
      )}
      {photos?.[1] && (
        <div className="photo-frame">
          <img src={photos[1].src} alt={photos[1].alt || ""} />
        </div>
      )}
    </div>
  </div>
));
LandscapePage.displayName = "LandscapePage";

/**
 * Panorama left half (spread across two pages). Displays programmatically split left half.
 */
export const PanoramaLeftPage = forwardRef(({ photo }, ref) => {
  const [leftSrc, setLeftSrc] = useState(null);

  useEffect(() => {
    if (!photo?.src) return;
    splitPanorama(photo.src).then((split) => setLeftSrc(split.left));
  }, [photo?.src]);

  return (
    <div ref={ref} className="album-page panorama-page panorama-left">
      {photo && leftSrc && (
        <div className="panorama-spread">
          <img src={leftSrc} alt={photo.alt || ""} className="panorama-image" />
        </div>
      )}
    </div>
  );
});
PanoramaLeftPage.displayName = "PanoramaLeftPage";

/**
 * Panorama right half (spread across two pages). Displays programmatically split right half.
 */
export const PanoramaRightPage = forwardRef(({ photo }, ref) => {
  const [rightSrc, setRightSrc] = useState(null);

  useEffect(() => {
    if (!photo?.src) return;
    splitPanorama(photo.src).then((split) => setRightSrc(split.right));
  }, [photo?.src]);

  return (
    <div ref={ref} className="album-page panorama-page panorama-right">
      {photo && rightSrc && (
        <div className="panorama-spread">
          <img src={rightSrc} alt={photo.alt || ""} className="panorama-image" />
        </div>
      )}
    </div>
  );
});
PanoramaRightPage.displayName = "PanoramaRightPage";

/**
 * Blank page (for even page count).
 */
export const BlankPage = forwardRef((props, ref) => (
  <div ref={ref} className="album-page album-blank-page" />
));
BlankPage.displayName = "BlankPage";

/**
 * Layout A: 2 landscape stacked (rame fixe landscape). Sau 1 photo (singleOrientation portrait/landscape). Sau hero pagina 2.
 */
export const LayoutA = forwardRef(
  ({ photos, hero, singleOrientation, onPhotoOrientation }, ref) => {
    const firstOrientation = hero
      ? undefined
      : singleOrientation ?? (photos[1] ? "landscape" : undefined);
    return (
      <div ref={ref} className="album-page layout-a">
        <div className="layout-a-inner">
          {photos[0] && (
            <PhotoFrame
              photo={photos[0]}
              orientation={firstOrientation}
              className={`frame-single${hero ? " frame-hero" : ""}`}
              onOrientation={
                onPhotoOrientation
                  ? (o) => onPhotoOrientation(photos[0], o)
                  : undefined
              }
            />
          )}
          {photos[1] && (
            <PhotoFrame
              photo={photos[1]}
              orientation="landscape"
              className="frame-single"
              onOrientation={
                onPhotoOrientation
                  ? (o) => onPhotoOrientation(photos[1], o)
                  : undefined
              }
            />
          )}
        </div>
      </div>
    );
  }
);
LayoutA.displayName = "LayoutA";

/**
 * Layout B: 2 portrait side by side (rame fixe portrait)
 */
export const LayoutB = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-b">
    <div className="layout-b-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="portrait"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          orientation="portrait"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
LayoutB.displayName = "LayoutB";

/**
 * Layout P1: 1 portrait + 2 pătrate pe verticală (stânga portrait, dreapta 2 pătrate stacked)
 */
export const LayoutP1 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-p1">
    <div className="layout-p1-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="portrait"
          className="frame-portrait-cell"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      <div className="layout-p1-squares">
        {photos[1] && (
          <PhotoFrame
            photo={photos[1]}
            orientation="square"
            onOrientation={
              onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
            }
          />
        )}
        {photos[2] && (
          <PhotoFrame
            photo={photos[2]}
            orientation="square"
            onOrientation={
              onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
            }
          />
        )}
      </div>
    </div>
  </div>
));
LayoutP1.displayName = "LayoutP1";

/**
 * Layout L1: 1 landscape + 2 pătrate pe orizontală, în același plan (un rând: landscape | square | square)
 */
export const LayoutL1 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-l1">
    <div className="layout-l1-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="landscape"
          className="layout-l1-landscape"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
      {photos[2] && (
        <PhotoFrame
          photo={photos[2]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
LayoutL1.displayName = "LayoutL1";

/**
 * Layout C: 3 photos (2 top, 1 bottom)
 */
export const LayoutC = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-c">
    <div className="layout-c-inner">
      <div className="layout-c-top">
        {photos[0] && (
          <PhotoFrame
            photo={photos[0]}
            onOrientation={
              onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
            }
          />
        )}
        {photos[1] && (
          <PhotoFrame
            photo={photos[1]}
            onOrientation={
              onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
            }
          />
        )}
      </div>
      <div className="layout-c-bottom">
        {photos[2] && (
          <PhotoFrame
            photo={photos[2]}
            className="frame-wide"
            onOrientation={
              onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
            }
          />
        )}
      </div>
    </div>
  </div>
));
LayoutC.displayName = "LayoutC";

/**
 * Layout D: 4 photos grid (2x2)
 */
export const LayoutD = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-d">
    <div className="layout-d-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
      {photos[2] && (
        <PhotoFrame
          photo={photos[2]}
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
          }
        />
      )}
      {photos[3] && (
        <PhotoFrame
          photo={photos[3]}
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[3], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
LayoutD.displayName = "LayoutD";

/**
 * Hero: single square hero image (page 2)
 */
export const LayoutHero = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-hero">
    <div className="layout-hero-inner">
      {photos[0] && (
        <div className="photo-frame frame-hero">
          <img src={photos[0].src} alt={photos[0].alt ?? ""} />
        </div>
      )}
    </div>
  </div>
));
LayoutHero.displayName = "LayoutHero";

/**
 * PortraitPair: vertical stack of 2 portrait frames
 */
export const PortraitPair = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-portrait-pair">
    <div className="layout-pair-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} orientation="portrait" />}
      {photos[1] && <PhotoFrame photo={photos[1]} orientation="portrait" />}
    </div>
  </div>
));
PortraitPair.displayName = "PortraitPair";

/**
 * LandscapePair: vertical stack of 2 landscape frames
 */
export const LandscapePair = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-landscape-pair">
    <div className="layout-pair-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} orientation="landscape" />}
      {photos[1] && <PhotoFrame photo={photos[1]} orientation="landscape" />}
    </div>
  </div>
));
LandscapePair.displayName = "LandscapePair";

/**
 * Square layouts: 4, 3, 2, or 1 square photos at end of album
 */
export const Square4 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-square-4">
    <div className="layout-square-inner layout-square-4-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
      {photos[2] && (
        <PhotoFrame
          photo={photos[2]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
          }
        />
      )}
      {photos[3] && (
        <PhotoFrame
          photo={photos[3]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[3], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
Square4.displayName = "Square4";

export const Square3 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-square-3">
    <div className="layout-square-inner layout-square-3-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
      {photos[2] && (
        <PhotoFrame
          photo={photos[2]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[2], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
Square3.displayName = "Square3";

export const Square2 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-square-2">
    <div className="layout-square-inner layout-square-2-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
      {photos[1] && (
        <PhotoFrame
          photo={photos[1]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[1], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
Square2.displayName = "Square2";

export const Square1 = forwardRef(({ photos, onPhotoOrientation }, ref) => (
  <div ref={ref} className="album-page layout-square-1">
    <div className="layout-square-inner layout-square-1-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          orientation="square"
          onOrientation={
            onPhotoOrientation ? (o) => onPhotoOrientation(photos[0], o) : undefined
          }
        />
      )}
    </div>
  </div>
));
Square1.displayName = "Square1";

export const LAYOUT_COMPONENTS = {
  HERO: LayoutHero,
  PORTRAIT_PAIR: PortraitPair,
  LANDSCAPE_PAIR: LandscapePair,
  SINGLE: LayoutA,
  SQUARE_4: Square4,
  SQUARE_3: Square3,
  SQUARE_2: Square2,
  SQUARE_1: Square1,
  BLANK: BlankPage,
  A: LayoutA,
  B: LayoutB,
  C: LayoutC,
  D: LayoutD,
  P1: LayoutP1,
  L1: LayoutL1,
};
