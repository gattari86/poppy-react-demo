"use client";

import { motion, useScroll } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(to right, #6B4EFF, #9B85FF)",
        zIndex: 9999,
      }}
    />
  );
}

export default ScrollProgress;
