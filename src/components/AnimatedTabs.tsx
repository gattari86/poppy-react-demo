"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Dashboard", "Projects", "Settings"] as const;
type Tab = (typeof tabs)[number];

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
          className="rounded-xl border border-[#E9E6FF] p-6 text-center"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <p className="text-sm opacity-60 mb-1">{m.label}</p>
          <p className="text-3xl font-semibold" style={{ color: "#6B4EFF" }}>
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    { name: "Website Redesign", status: "In Progress", color: "#6B4EFF" },
    { name: "SEO Audit", status: "Complete", color: "#22c55e" },
    { name: "Ad Campaign Q2", status: "Planning", color: "#f59e0b" },
    { name: "Brand Refresh", status: "In Review", color: "#6B4EFF" },
  ];

  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <div
          key={p.name}
          className="flex items-center justify-between rounded-lg border border-[#E9E6FF] px-5 py-3"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <span className="font-medium">{p.name}</span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: p.color }}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function SettingsContent() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoReports, setAutoReports] = useState(true);

  const toggles = [
    { label: "Notifications", value: notifications, set: setNotifications },
    { label: "Dark Mode", value: darkMode, set: setDarkMode },
    { label: "Auto-Reports", value: autoReports, set: setAutoReports },
  ];

  return (
    <div className="space-y-4">
      {toggles.map((t) => (
        <div
          key={t.label}
          className="flex items-center justify-between rounded-lg border border-[#E9E6FF] px-5 py-4"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <span className="font-medium">{t.label}</span>
          <button
            onClick={() => t.set(!t.value)}
            className="relative w-12 h-6 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: t.value ? "#6B4EFF" : "#ccc",
            }}
            aria-label={`Toggle ${t.label}`}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
              animate={{ left: t.value ? "1.625rem" : "0.125rem" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

const tabContent: Record<Tab, () => React.ReactElement> = {
  Dashboard: DashboardContent,
  Projects: ProjectsContent,
  Settings: SettingsContent,
};

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const Content = tabContent[activeTab];

  return (
    <section className="w-full max-w-2xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2
          className="text-3xl font-semibold mb-2"
          style={{ fontFamily: "var(--font-poppins, Poppins, sans-serif)" }}
        >
          Animated Page Transitions
        </h2>
        <p className="opacity-60 text-sm">
          Content exits and enters with physics. No page reload.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-5 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              color: activeTab === tab ? "#fff" : "#1F1F1F",
            }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-md"
                style={{ backgroundColor: "#6B4EFF" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
