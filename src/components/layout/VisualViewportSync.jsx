import { useLayoutEffect } from "react";
import {
  applyVisualViewportCssVars,
  subscribeVisualViewport,
} from "../../utils/visualViewport";

/**
 * Keeps --vv-* CSS variables in sync with the visual viewport
 * so fixed UI (accessibility widget) stays pinned while mobile chrome toggles.
 */
const VisualViewportSync = () => {
  useLayoutEffect(() => {
    applyVisualViewportCssVars();
    return subscribeVisualViewport(applyVisualViewportCssVars);
  }, []);

  return null;
};

export default VisualViewportSync;
