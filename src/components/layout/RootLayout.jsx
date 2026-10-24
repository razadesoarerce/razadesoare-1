import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import AccessibilityWidget from "../accessibility/AccessibilityWidget";
import VisualViewportSync from "./VisualViewportSync";

/** App-wide shell: scroll-to-top, accessibility tool, nested routes. */
const RootLayout = () => (
  <>
    <VisualViewportSync />
    <ScrollToTop />
    <Outlet />
    <AccessibilityWidget />
  </>
);

export default RootLayout;
