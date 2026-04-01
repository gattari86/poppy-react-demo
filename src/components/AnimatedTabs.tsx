"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#6B4EFF";
const BG = "var(--bg-primary, #0F0F13)";

const tabs = ["Dashboard", "Projects", "Settings"] as const;
type Tab = (typeof tabs)[number];

/* ------------------------------------------------------------------ */
/*  Spring configs                                                     */
/* ------------------------------------------------------------------ */

const contentSpring = { type: "spring" as const, stiffness: 300, damping: 30 };
const toggleSpring = { type: "spring" as const, stiffness: 500, damping: 30 };
const underlineSpring = { type: "spring" as const, stiffness: 400, damping: 30 };

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

function DashboardContent() {
  const metrics = [
    { label: "New Leads", value: "24" },
    { label: "Active Projects", value: "8" },
    { label: "Revenue", value: "$47K" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: `3px solid ${PURPLE}`,
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderTopWidth: 3,
            borderTopColor: PURPLE,
            padding: "1.5rem",
            textAlign: "center" as const,
          }}
        >
          <p style={{ fontSize: 14, color: "#8A8A96", marginBottom: 4 }}>
            {m.label}
          </p>
          <p
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: PURPLE,
              lineHeight: 1.2,
            }}
          >
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

interface Project {
  name: string;
  status: string;
  color: string;
}

const projects: Project[] = [
  { name: "Verizon Phase 2", status: "In Progress", color: "#3B82F6" },
  { name: "Albedo Ads", status: "Active", color: "#22C55E" },
  { name: "Fulshear Dental", status: "Proposal", color: "#F59E0B" },
  { name: "Bickham Services", status: "Kickoff Apr 20", color: PURPLE },
];

function ProjectsContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {projects.map((p) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 10,
            padding: "12px 20px",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 15, color: "#E8E6E3" }}>
            {p.name}
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 14px",
              borderRadius: 9999,
              color: "#fff",
              backgroundColor: p.color,
              whiteSpace: "nowrap",
            }}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings (with working toggles)                                    */
/* ------------------------------------------------------------------ */

function SettingsContent() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoReports, setAutoReports] = useState(true);

  const toggles: Array<{
    label: string;
    value: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  }> = [
    {
      label: "Email Notifications",
      value: emailNotifications,
      set: setEmailNotifications,
    },
    { label: "Dark Mode", value: darkMode, set: setDarkMode },
    { label: "Auto-Reports", value: autoReports, set: setAutoReports },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {toggles.map((t) => (
        <div
          key={t.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 10,
            padding: "14px 20px",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 15, color: "#E8E6E3" }}>
            {t.label}
          </span>
          <button
            type="button"
            onClick={() => t.set((prev) => !prev)}
            aria-label={`Toggle ${t.label}`}
            aria-pressed={t.value}
            style={{
              position: "relative",
              width: 48,
              height: 26,
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              backgroundColor: t.value ? PURPLE : "#D1D5DB",
              transition: "background-color 0.2s ease",
              flexShrink: 0,
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 3,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
              animate={{ left: t.value ? 25 : 3 }}
              transition={toggleSpring}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab content map                                                    */
/* ------------------------------------------------------------------ */

const tabContent: Record<Tab, React.ReactNode> = {
  Dashboard: <DashboardContent />,
  Projects: <ProjectsContent />,
  Settings: <SettingsContent />,
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: BG,
        padding: "64px 16px",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: PURPLE,
              marginBottom: 8,
            }}
          >
            Interactive Demo
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#E8E6E3",
              marginBottom: 8,
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
            }}
          >
            Animated Transitions
          </h2>
          <p style={{ fontSize: 15, color: "#8A8A96" }}>
            Content exits with physics before new content enters. No page reload
            needed.
          </p>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                position: "relative",
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: activeTab === tab ? PURPLE : "#8A8A96",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = PURPLE;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = "#8A8A96";
                }
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>{tab}</span>
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 8,
                    right: 8,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: PURPLE,
                  }}
                  transition={underlineSpring}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content with AnimatePresence */}
        <div style={{ position: "relative", minHeight: 220 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={contentSpring}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
