"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "Active" | "Proposal" | "Complete";

interface ClientCard {
  id: string;
  name: string;
  service: string;
  status: Status;
  accent: string;
  details: string[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const clients: ClientCard[] = [
  {
    id: "verizon",
    name: "Verizon CMC",
    service: "AI Communications",
    status: "Active",
    accent: "#EE001E",
    details: [
      "Custom Gemini Gems for internal comms",
      "Phase 1 checkpoint delivered",
      "Training and coaching sessions complete",
      "Knowledge file optimization in progress",
    ],
  },
  {
    id: "albedos",
    name: "Albedos Return",
    service: "Google Ads + AI",
    status: "Active",
    accent: "#0EA5E9",
    details: [
      "Google Ads campaign management",
      "AI receptionist voice integration",
      "Lead capture and routing automation",
      "Monthly performance reporting",
    ],
  },
  {
    id: "drcheng",
    name: "Dr. Cheng",
    service: "Website + Launch",
    status: "Proposal",
    accent: "#F59E0B",
    details: [
      "Custom website design and build",
      "SEO foundation and content strategy",
      "Local search optimization",
      "Launch timeline and milestone plan",
    ],
  },
  {
    id: "readynest",
    name: "ReadyNest",
    service: "Brand + Website",
    status: "Complete",
    accent: "#6B4EFF",
    details: [
      "Full brand identity and guidelines",
      "Responsive website with premium animations",
      "Content strategy and copywriting",
      "Handoff documentation delivered",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Status badge color map                                             */
/* ------------------------------------------------------------------ */

const statusBadge: Record<Status, { bg: string; text: string }> = {
  Active: { bg: "rgba(22, 163, 74, 0.12)", text: "#16a34a" },
  Proposal: { bg: "rgba(245, 158, 11, 0.12)", text: "#d97706" },
  Complete: { bg: "rgba(107, 78, 255, 0.12)", text: "#6B4EFF" },
};

/* ------------------------------------------------------------------ */
/*  Motion config                                                      */
/* ------------------------------------------------------------------ */

const spring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
  mass: 0.8,
};

const gentleSpring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 22,
  mass: 1,
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const detailContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
  },
};

const detailItemVariants: Variants = {
  hidden: { opacity: 0, x: -14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: spring,
  },
};

/* ------------------------------------------------------------------ */
/*  Glassmorphism card styles                                          */
/* ------------------------------------------------------------------ */

const glassCard: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "16px",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ClientCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedCard = clients.find((c) => c.id === selectedId) ?? null;

  const close = useCallback(() => setSelectedId(null), []);
  const open = useCallback((id: string) => setSelectedId(id), []);

  return (
    <section
      style={{
        background: "#F6F4EF",
        padding: "7rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* ---- Header ---- */}
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={spring}
        style={{
          fontFamily: "var(--font-display, 'Poppins', sans-serif)",
          fontWeight: 600,
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6B4EFF",
          marginBottom: "1rem",
        }}
      >
        Layout Animations
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ ...spring, delay: 0.06 }}
        style={{
          fontFamily: "var(--font-display, 'Poppins', sans-serif)",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
          color: "#1F1F1F",
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}
      >
        Click a Card. Watch It Transform.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ ...spring, delay: 0.12 }}
        style={{
          fontFamily: "var(--font-body, 'Raleway', sans-serif)",
          fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
          color: "#6B6B6B",
          marginTop: "0.85rem",
          marginBottom: "3.5rem",
          textAlign: "center",
          maxWidth: "540px",
          lineHeight: 1.6,
        }}
      >
        Layout animations, shared element transitions, and exit physics.
        Impossible in static HTML.
      </motion.p>

      {/* ---- Card Grid ---- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
          maxWidth: "720px",
          width: "100%",
        }}
        className="client-cards-grid"
      >
        {clients.map((card, i) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...spring, delay: i * 0.08 }}
            whileHover={{
              y: -4,
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.10)",
            }}
            onClick={() => open(card.id)}
            style={{
              ...glassCard,
              padding: "1.6rem 1.6rem 1.6rem 1.85rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Left accent bar */}
            <motion.div
              layoutId={`accent-${card.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: card.accent,
                borderRadius: "16px 0 0 16px",
              }}
            />

            {/* Badge */}
            <motion.span
              layoutId={`badge-${card.id}`}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                fontWeight: 600,
                fontSize: "0.66rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: statusBadge[card.status].text,
                background: statusBadge[card.status].bg,
                padding: "0.22rem 0.7rem",
                borderRadius: "100px",
                marginBottom: "0.85rem",
              }}
            >
              {card.status}
            </motion.span>

            {/* Title */}
            <motion.h3
              layoutId={`title-${card.id}`}
              style={{
                fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                fontWeight: 600,
                fontSize: "1.15rem",
                color: "#1F1F1F",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {card.name}
            </motion.h3>

            {/* Service line */}
            <motion.p
              layoutId={`service-${card.id}`}
              style={{
                fontFamily: "var(--font-body, 'Raleway', sans-serif)",
                fontSize: "0.88rem",
                color: "#8A8A8A",
                marginTop: "0.35rem",
                marginBottom: 0,
                lineHeight: 1.4,
              }}
            >
              {card.service}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* ---- Expanded Overlay ---- */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(31, 31, 31, 0.35)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 998,
                cursor: "pointer",
              }}
            />

            {/* Expanded card */}
            <motion.div
              key="expanded-card"
              layoutId={`card-${selectedCard.id}`}
              transition={gentleSpring}
              style={{
                ...glassCard,
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "min(92vw, 600px)",
                maxHeight: "85vh",
                overflowY: "auto",
                padding: "2.5rem 2.5rem 2.5rem 2.75rem",
                zIndex: 999,
                boxShadow:
                  "0 32px 80px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255,255,255,0.15)",
                background: "rgba(255, 255, 255, 0.85)",
                cursor: "default",
              }}
            >
              {/* Accent bar */}
              <motion.div
                layoutId={`accent-${selectedCard.id}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background: selectedCard.accent,
                  borderRadius: "16px 0 0 16px",
                }}
              />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1, ...spring }}
                onClick={close}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1.15rem",
                  right: "1.15rem",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: "#1F1F1F",
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: "background 0.15s, border-color 0.15s",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(107, 78, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(107, 78, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.7)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
                }}
              >
                {"\u00D7"}
              </motion.button>

              {/* Badge */}
              <motion.span
                layoutId={`badge-${selectedCard.id}`}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                  fontWeight: 600,
                  fontSize: "0.66rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: statusBadge[selectedCard.status].text,
                  background: statusBadge[selectedCard.status].bg,
                  padding: "0.22rem 0.7rem",
                  borderRadius: "100px",
                  marginBottom: "0.85rem",
                }}
              >
                {selectedCard.status}
              </motion.span>

              {/* Title */}
              <motion.h3
                layoutId={`title-${selectedCard.id}`}
                style={{
                  fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                  fontWeight: 700,
                  fontSize: "1.65rem",
                  color: "#1F1F1F",
                  margin: 0,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  paddingRight: "2.5rem",
                }}
              >
                {selectedCard.name}
              </motion.h3>

              {/* Service */}
              <motion.p
                layoutId={`service-${selectedCard.id}`}
                style={{
                  fontFamily: "var(--font-body, 'Raleway', sans-serif)",
                  fontSize: "1rem",
                  color: "#8A8A8A",
                  marginTop: "0.4rem",
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                {selectedCard.service}
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, ...spring }}
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(107,78,255,0.25) 0%, rgba(107,78,255,0) 100%)",
                  marginTop: "1.5rem",
                  marginBottom: "1.25rem",
                  transformOrigin: "left",
                }}
              />

              {/* Detail bullets */}
              <motion.ul
                variants={detailContainerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {selectedCard.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    variants={detailItemVariants}
                    style={{
                      fontFamily: "var(--font-body, 'Raleway', sans-serif)",
                      fontSize: "0.95rem",
                      color: "#3A3A3A",
                      lineHeight: 1.55,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.5em",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: selectedCard.accent,
                        opacity: 0.7,
                      }}
                    />
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---- Responsive styles ---- */}
      <style>{`
        @media (max-width: 640px) {
          .client-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
