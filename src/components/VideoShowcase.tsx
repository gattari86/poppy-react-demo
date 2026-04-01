"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";

const VIDEO_URL =
  "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4";

const FALLBACK_GRADIENT =
  "linear-gradient(135deg, #0F0F13, #1a1033, #0F0F13)";

const blurSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
};

export function VideoShowcase() {
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        minHeight: "480px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Video or fallback */}
      {videoFailed ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: FALLBACK_GRADIENT,
            zIndex: 0,
          }}
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={handleError}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(15, 15, 19, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "680px",
          padding: "0 2rem",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(12px)" }
          }
          transition={blurSpring}
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#FFFFFF",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Strategy First. Always.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(12px)" }
          }
          transition={{ ...blurSpring, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            color: "#8A8A96",
            marginTop: "1.25rem",
            lineHeight: 1.65,
            maxWidth: "540px",
            marginInline: "auto",
          }}
        >
          We do not build until we know why. Every project starts with research,
          validation, and clear objectives.
        </motion.p>
      </div>
    </section>
  );
}
