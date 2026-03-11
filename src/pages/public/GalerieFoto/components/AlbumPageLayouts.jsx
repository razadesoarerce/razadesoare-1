import { forwardRef } from "react";
import PhotoFrame from "./PhotoFrame";

/**
 * Cover page: displays cover image (image 9) before the album opens.
 */
export const CoverPage = forwardRef(({ coverPhoto }, ref) => (
  <div ref={ref} className="album-page album-cover-page">
    <div className="album-cover-inner">
      {coverPhoto && (
        <div className="photo-frame frame-cover">
          <img src={coverPhoto.src} alt={coverPhoto.alt ?? ""} />
        </div>
      )}
    </div>
  </div>
));
CoverPage.displayName = "CoverPage";

/**
 * Title page: left page of first spread. Centered title text.
 */
export const TitlePage = forwardRef((props, ref) => (
  <div ref={ref} className="album-page album-title-page">
    <div className="album-title-inner">
      <h2 className="album-title-text">Sarbatoarea Martisorului de 1 Martie</h2>
    </div>
  </div>
));
TitlePage.displayName = "TitlePage";

/**
 * Blank page (for even page count).
 */
export const BlankPage = forwardRef((props, ref) => (
  <div ref={ref} className="album-page album-blank-page" />
));
BlankPage.displayName = "BlankPage";

/**
 * Layout A: 1 photo (full) or 2 photos stacked (landscape). Pass hero for square hero frame.
 */
export const LayoutA = forwardRef(({ photos, hero }, ref) => (
  <div ref={ref} className="album-page layout-a">
    <div className="layout-a-inner">
      {photos[0] && (
        <PhotoFrame
          photo={photos[0]}
          className={`frame-single${hero ? " frame-hero" : ""}`}
        />
      )}
      {photos[1] && <PhotoFrame photo={photos[1]} className="frame-single" />}
    </div>
  </div>
));
LayoutA.displayName = "LayoutA";

/**
 * Layout B: 2 photos side by side
 */
export const LayoutB = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-b">
    <div className="layout-b-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
      {photos[1] && <PhotoFrame photo={photos[1]} />}
    </div>
  </div>
));
LayoutB.displayName = "LayoutB";

/**
 * Layout C: 3 photos (2 top, 1 bottom)
 */
export const LayoutC = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-c">
    <div className="layout-c-inner">
      <div className="layout-c-top">
        {photos[0] && <PhotoFrame photo={photos[0]} />}
        {photos[1] && <PhotoFrame photo={photos[1]} />}
      </div>
      <div className="layout-c-bottom">
        {photos[2] && <PhotoFrame photo={photos[2]} className="frame-wide" />}
      </div>
    </div>
  </div>
));
LayoutC.displayName = "LayoutC";

/**
 * Layout D: 4 photos grid (2x2)
 */
export const LayoutD = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-d">
    <div className="layout-d-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
      {photos[1] && <PhotoFrame photo={photos[1]} />}
      {photos[2] && <PhotoFrame photo={photos[2]} />}
      {photos[3] && <PhotoFrame photo={photos[3]} />}
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
export const Square4 = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-square-4">
    <div className="layout-square-inner layout-square-4-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
      {photos[1] && <PhotoFrame photo={photos[1]} />}
      {photos[2] && <PhotoFrame photo={photos[2]} />}
      {photos[3] && <PhotoFrame photo={photos[3]} />}
    </div>
  </div>
));
Square4.displayName = "Square4";

export const Square3 = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-square-3">
    <div className="layout-square-inner layout-square-3-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
      {photos[1] && <PhotoFrame photo={photos[1]} />}
      {photos[2] && <PhotoFrame photo={photos[2]} />}
    </div>
  </div>
));
Square3.displayName = "Square3";

export const Square2 = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-square-2">
    <div className="layout-square-inner layout-square-2-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
      {photos[1] && <PhotoFrame photo={photos[1]} />}
    </div>
  </div>
));
Square2.displayName = "Square2";

export const Square1 = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-square-1">
    <div className="layout-square-inner layout-square-1-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} />}
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
};
