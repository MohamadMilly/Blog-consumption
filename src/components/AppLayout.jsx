/*
 import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
// AppLayout.jsx
export function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            style={{ position: "absolute", width: "100%" }}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
*/
