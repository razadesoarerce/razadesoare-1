import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import AccessibilityWidget from "../accessibility/AccessibilityWidget";

/** App-wide shell: scroll-to-top, accessibility tool, nested routes. */
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
    <AccessibilityWidget />
  </>
);

export default RootLayout;
