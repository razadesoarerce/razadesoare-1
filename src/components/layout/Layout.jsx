import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <TopBar />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            minHeight: "80vh",
            paddingTop: "98px"  // topbar + navbar aproximativ
          }}
        >
          <div className="container">
            <Outlet />
          </div>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Layout;