"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (dark) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    }
  }, [dark]);

  return (
    <>
      {/* Inject CSS variables and transitions */}
      <style jsx global>{`
        body {
          transition: background-color 0.4s ease, color 0.4s ease;
        }
        body.light-mode {
          --color-bg: #f6f4ef;
          --color-text: #1f1f1f;
          --color-accent: #6b4eff;
          --color-surface: #ffffff;
          background-color: var(--color-bg);
          color: var(--color-text);
        }
        body.dark-mode {
          --color-bg: #1f1f1f;
          --color-text: #f6f4ef;
          --color-accent: #6b4eff;
          --color-surface: #2a2a2a;
          background-color: var(--color-bg);
          color: var(--color-text);
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md border-b"
        style={{
          backgroundColor: dark
            ? "rgba(31, 31, 31, 0.85)"
            : "rgba(246, 244, 239, 0.85)",
          borderColor: dark
            ? "rgba(246, 244, 239, 0.1)"
            : "rgba(31, 31, 31, 0.08)",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        <span
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-poppins, Poppins, sans-serif)" }}
        >
          Poppy React Demo
        </span>

        {/* Toggle switch */}
        <button
          onClick={() => setDark(!dark)}
          className="relative flex items-center w-14 h-7 rounded-full p-0.5"
          style={{
            backgroundColor: dark ? "#6B4EFF" : "#E9E6FF",
            transition: "background-color 0.3s ease",
          }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <motion.div
            className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: "#fff" }}
            animate={{ x: dark ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {/* Sun icon (light mode) */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B4EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: dark ? 0 : 1, rotate: dark ? -90 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: "absolute" }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>

            {/* Moon icon (dark mode) */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B4EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: dark ? 1 : 0, rotate: dark ? 0 : 90 }}
              transition={{ duration: 0.2 }}
              style={{ position: "absolute" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          </motion.div>
        </button>
      </nav>
    </>
  );
}
