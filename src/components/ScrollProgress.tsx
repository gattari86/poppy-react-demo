"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
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
        height: 4,
        background: "linear-gradient(to right, #6B4EFF, #9B85FF)",
        zIndex: 9999,
        boxShadow: "0 0 8px rgba(107, 78, 255, 0.5)",
      }}
    />
  );
}
