"use client";

import { motion } from "framer-motion";

const springTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
  mass: 1,
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

const chevronBounce = {
  y: [0, 12, 0],
  transition: {
    duration: 1.6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#F6F4EF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
      }}
    >
      {/* Brand label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...springTransition, delay: 0.05 }}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2.5rem",
          fontFamily: "var(--font-display, 'Poppins', sans-serif)",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#6B4EFF",
        }}
      >
        Poppy Marketing and Consulting
      </motion.div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: "center",
          maxWidth: "52rem",
        }}
      >
        <motion.h1
          variants={staggerChild}
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            lineHeight: 1.08,
            color: "#1F1F1F",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          This Is What React Can Do
        </motion.h1>

        <motion.p
          variants={staggerChild}
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontWeight: 400,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
            color: "#555",
            marginTop: "1.5rem",
            maxWidth: "38rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Spring physics. Layout animations. Drag gestures. Page transitions.
          Things static HTML simply cannot do.
        </motion.p>
      </motion.div>

      {/* Scroll-down chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <motion.span
          animate={chevronBounce}
          style={{
            display: "block",
            width: "1.6rem",
            height: "1.6rem",
            borderRight: "2px solid #6B4EFF",
            borderBottom: "2px solid #6B4EFF",
            transform: "rotate(45deg)",
            opacity: 0.7,
          }}
        />
        <motion.span
          animate={{
            ...chevronBounce,
            transition: { ...chevronBounce.transition, delay: 0.15 },
          }}
          style={{
            display: "block",
            width: "1.2rem",
            height: "1.2rem",
            borderRight: "2px solid #6B4EFF",
            borderBottom: "2px solid #6B4EFF",
            transform: "rotate(45deg)",
            marginTop: "-0.6rem",
            opacity: 0.4,
          }}
        />
      </motion.div>
    </section>
  );
}
