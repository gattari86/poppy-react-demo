"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: dark
          ? "rgba(15, 15, 19, 0.85)"
          : "rgba(246, 244, 239, 0.85)",
        borderBottom: dark
          ? "1px solid rgba(232, 230, 227, 0.08)"
          : "1px solid rgba(31, 31, 31, 0.06)",
        transition:
          "background-color 0.4s ease, border-bottom-color 0.4s ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-poppins, Poppins, sans-serif)",
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#6B4EFF",
          letterSpacing: "-0.01em",
        }}
      >
        Poppy
      </span>

      <button
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: 48,
          height: 26,
          borderRadius: 13,
          padding: 2,
          border: "none",
          cursor: "pointer",
          backgroundColor: dark ? "#6B4EFF" : "#C4C0CC",
          transition: "background-color 0.3s ease",
        }}
      >
        <motion.div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
          animate={{ x: dark ? 22 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span
            style={{ position: "absolute", display: "flex" }}
            animate={{ opacity: dark ? 0 : 1, rotate: dark ? -90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={13} color="#6B4EFF" strokeWidth={2.5} />
          </motion.span>
          <motion.span
            style={{ position: "absolute", display: "flex" }}
            animate={{ opacity: dark ? 1 : 0, rotate: dark ? 0 : 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={13} color="#6B4EFF" strokeWidth={2.5} />
          </motion.span>
        </motion.div>
      </button>
    </nav>
  );
}
