import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <>
      {/* Black overlay transition */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black z-50"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
