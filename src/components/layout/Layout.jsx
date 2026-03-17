import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import ScrollToTop from "../utils/ScrollToTop";
import BackToTop from "../ui/BackToTop";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <header className="site-header">
        <TopBar />
        <Navbar />
      </header>

      <div className="layout-content">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: "80vh" }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
      <BackToTop />
    </>
  );
};

export default Layout;