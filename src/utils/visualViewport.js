/**
 * Visual viewport helpers — keep fixed UI pinned to the visible screen
 * when mobile browser chrome shows/hides (avoids bottom-fixed snap).
 */

export function getVisualViewportBox() {
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  if (vv) {
    return {
      offsetLeft: vv.offsetLeft,
      offsetTop: vv.offsetTop,
      width: vv.width,
      height: vv.height,
    };
  }
  return {
    offsetLeft: 0,
    offsetTop: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/** Apply CSS vars used by fixed chrome (a11y widget, etc.). */
export function applyVisualViewportCssVars(box = getVisualViewportBox()) {
  const root = document.documentElement;
  root.style.setProperty("--vv-left", `${box.offsetLeft}px`);
  root.style.setProperty("--vv-top", `${box.offsetTop}px`);
  root.style.setProperty("--vv-width", `${box.width}px`);
  root.style.setProperty("--vv-height", `${box.height}px`);
  return box;
}

/**
 * Subscribe to visualViewport + window resize.
 * Callbacks are coalesced to one animation frame.
 * @returns {() => void} unsubscribe
 */
export function subscribeVisualViewport(onFrame) {
  let raf = 0;

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      onFrame(getVisualViewportBox());
    });
  };

  schedule();
  window.addEventListener("resize", schedule);

  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);
  }

  return () => {
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("resize", schedule);
    if (vv) {
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
    }
  };
}
