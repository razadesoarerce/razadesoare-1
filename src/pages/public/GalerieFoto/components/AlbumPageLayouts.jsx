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
 * First spread right: one large landscape image (image 5).
 */
export const FirstSpreadRightPage = forwardRef(({ photo }, ref) => (
  <div ref={ref} className="album-page layout-a">
    <div className="layout-a-inner">
      {photo && (
        <PhotoFrame photo={photo} className="frame-single frame-landscape" orientation="landscape" />
      )}
    </div>
  </div>
));
FirstSpreadRightPage.displayName = "FirstSpreadRightPage";

/**
 * Blank page (for even page count).
 */
export const BlankPage = forwardRef((props, ref) => (
  <div ref={ref} className="album-page album-blank-page" />
));
BlankPage.displayName = "BlankPage";

/**
 * Layout A: 1 large photo
 */
export const LayoutA = forwardRef(({ photos }, ref) => (
  <div ref={ref} className="album-page layout-a">
    <div className="layout-a-inner">
      {photos[0] && <PhotoFrame photo={photos[0]} className="frame-single" />}
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

export const LAYOUT_COMPONENTS = {
  A: LayoutA,
  B: LayoutB,
  C: LayoutC,
  D: LayoutD,
};
