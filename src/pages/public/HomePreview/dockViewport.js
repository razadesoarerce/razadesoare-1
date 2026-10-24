import { getVisualViewportBox } from "../../../utils/visualViewport";

export const DOCK_MARGIN = 12;

/** Clamp dock left/top into the visible visual viewport. */
export const clampDockPos = (left, top, width = 80, height = 80) => {
  const box = getVisualViewportBox();
  const minLeft = box.offsetLeft + DOCK_MARGIN;
  const minTop = box.offsetTop + DOCK_MARGIN;
  const maxLeft = Math.max(minLeft, box.offsetLeft + box.width - width - DOCK_MARGIN);
  const maxTop = Math.max(minTop, box.offsetTop + box.height - height - DOCK_MARGIN);
  return {
    left: Math.min(Math.max(minLeft, left), maxLeft),
    top: Math.min(Math.max(minTop, top), maxTop),
  };
};

/** Default: bottom-right of the visual viewport. */
export const getDockViewportHome = (width = 80, height = 80) => {
  const box = getVisualViewportBox();
  return clampDockPos(
    box.offsetLeft + box.width - width - DOCK_MARGIN,
    box.offsetTop + box.height - height - DOCK_MARGIN,
    width,
    height
  );
};
