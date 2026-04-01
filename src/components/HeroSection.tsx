"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const VANTA_COLORS = {
  baseColor: 0x1a1033,
  backgroundColor: 0x0f0f13,
};

const PURPLE = "#6B4EFF";
const MUTED = "#8A8A96";
const BG_DARK = "#0F0F13";

const blurIn = (delay: number) => ({
  initial: { opacity: 0, filter: "blur(10px)", y: 30 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: {
    type: "spring" as const,
    stiffness: 100,
    damping: 16,
    mass: 1,
    delay,
  },
});

export function HeroSection() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [vantaReady, setVantaReady] = useState(false);

  const initVanta = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Load Three.js
    if (!(window as any).THREE) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      document.head.appendChild(script);
      await new Promise<void>((r) => {
        script.onload = () => r();
      });
    }

    // Load Vanta HALO
    if (!(window as any).VANTA?.HALO) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js";
      document.head.appendChild(script);
      await new Promise<void>((r) => {
        script.onload = () => r();
      });
    }

    if (vantaRef.current && (window as any).VANTA) {
      vantaEffect.current = (window as any).VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        baseColor: VANTA_COLORS.baseColor,
        backgroundColor: VANTA_COLORS.backgroundColor,
        amplitudeFactor: 1.5,
        size: 1.5,
      });
      setVantaReady(true);
    }
  }, []);

  useEffect(() => {
    initVanta();
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [initVanta]);

  return (
    <section
      ref={vantaRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        background: BG_DARK,
        overflow: "hidden",
      }}
    >
      {/* ---- Content layer ---- */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Brand mark -- top left */}
        <motion.div
          {...blurIn(0.3)}
          style={{
            position: "absolute",
            top: "2rem",
            left: "2.5rem",
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: PURPLE,
            userSelect: "none",
          }}
        >
          Poppy Marketing and Consulting
        </motion.div>

        {/* Headline block */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "56rem",
          }}
        >
          {/* "We build" */}
          <motion.h1
            {...blurIn(0.5)}
            style={{
              fontFamily: "var(--font-display, 'Poppins', sans-serif)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
              color: "#E0E0E6",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            We build
          </motion.h1>

          {/* Typed cycling word */}
          <motion.div
            {...blurIn(0.7)}
            style={{
              fontFamily: "var(--font-display, 'Poppins', sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 1.1,
              color: PURPLE,
              letterSpacing: "-0.03em",
              minHeight: "1.2em",
              marginTop: "0.15em",
            }}
          >
            <TypeAnimation
              sequence={[
                "landing pages.",
                2000,
                "",
                300,
                "client portals.",
                2000,
                "",
                300,
                "brand experiences.",
                2000,
                "",
                300,
                "AI dashboards.",
                2000,
                "",
                300,
                "growth engines.",
                2000,
                "",
                300,
              ]}
              wrapper="span"
              speed={45}
              deletionSpeed={55}
              repeat={Infinity}
              cursor={true}
              style={{ display: "inline-block" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...blurIn(0.9)}
            style={{
              fontFamily: "var(--font-body, 'Raleway', sans-serif)",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
              lineHeight: 1.7,
              color: MUTED,
              marginTop: "2rem",
              maxWidth: "34rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            This is what React can do that static HTML cannot.
          </motion.p>
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        {...blurIn(1.3)}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {/* Mouse outline */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "1.5rem",
            height: "2.4rem",
            border: `2px solid ${PURPLE}`,
            borderRadius: "1rem",
            position: "relative",
            opacity: 0.6,
          }}
        >
          {/* Scroll dot inside mouse */}
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "3px",
              height: "6px",
              backgroundColor: PURPLE,
              borderRadius: "2px",
              position: "absolute",
              top: "5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </motion.div>
        <motion.span
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Scroll
        </motion.span>
      </motion.div>

      {/* ---- Bottom gradient fade ---- */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background: `linear-gradient(to bottom, transparent, ${BG_DARK})`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
