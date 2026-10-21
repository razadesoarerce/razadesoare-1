import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

/** App-wide shell: scroll-to-top on every navigation + nested routes. */
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export default RootLayout;
