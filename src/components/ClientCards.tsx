"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientCard {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Proposal" | "Completed";
  details: string[];
}

const clients: ClientCard[] = [
  {
    id: "verizon",
    name: "Verizon CMC",
    description: "AI Communications System",
    status: "Active",
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
    description: "Google Ads + AI Receptionist",
    status: "Active",
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
    description: "Website + Launch Strategy",
    status: "Proposal",
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
    description: "Brand + Website",
    status: "Completed",
    details: [
      "Full brand identity and guidelines",
      "Responsive website with premium animations",
      "Content strategy and copywriting",
      "Handoff documentation delivered",
    ],
  },
];

const statusColors: Record<ClientCard["status"], string> = {
  Active: "#16a34a",
  Proposal: "#ea880e",
  Completed: "#6B4EFF",
};

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 24,
  mass: 0.8,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const expandedVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.2 },
  },
};

export function ClientCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCard = clients.find((c) => c.id === selectedId) ?? null;

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handleCardClick = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "6rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={springTransition}
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#1F1F1F",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Layout Animations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...springTransition, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontSize: "1.1rem",
            color: "#555",
            marginTop: "0.75rem",
          }}
        >
          Click a card to expand. Impossible in static HTML.
        </motion.p>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: "680px",
          width: "100%",
        }}
      >
        {clients.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-container-${card.id}`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
            transition={springTransition}
            style={{
              background: "#F6F4EF",
              borderRadius: "14px",
              padding: "1.75rem",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent bar */}
            <motion.div
              layoutId={`card-accent-${card.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "#6B4EFF",
                borderRadius: "14px 0 0 14px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <motion.h3
                layoutId={`card-title-${card.id}`}
                style={{
                  fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: "#1F1F1F",
                  margin: 0,
                }}
              >
                {card.name}
              </motion.h3>
              <motion.span
                layoutId={`card-badge-${card.id}`}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-display, 'Poppins', sans-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  background: statusColors[card.status],
                  padding: "0.2rem 0.65rem",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                }}
              >
                {card.status}
              </motion.span>
            </div>

            <motion.p
              layoutId={`card-desc-${card.id}`}
              style={{
                fontFamily: "var(--font-body, 'Raleway', sans-serif)",
                fontSize: "0.92rem",
                color: "#777",
                marginTop: "0.5rem",
                marginBottom: 0,
              }}
            >
              {card.description}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleClose}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(31, 31, 31, 0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 100,
                cursor: "pointer",
              }}
            />

            {/* Expanded card */}
            <motion.div
              key="expanded"
              layoutId={`card-container-${selectedCard.id}`}
              variants={expandedVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(90vw, 480px)",
                background: "#F6F4EF",
                borderRadius: "18px",
                padding: "2.25rem",
                zIndex: 101,
                boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                overflow: "hidden",
              }}
            >
              {/* Accent bar */}
              <motion.div
                layoutId={`card-accent-${selectedCard.id}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background: "#6B4EFF",
                  borderRadius: "18px 0 0 18px",
                }}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close expanded card"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(31, 31, 31, 0.06)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  color: "#1F1F1F",
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(31, 31, 31, 0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(31, 31, 31, 0.06)")
                }
              >
                {"\u00D7"}
              </button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  paddingRight: "2rem",
                }}
              >
                <motion.h3
                  layoutId={`card-title-${selectedCard.id}`}
                  style={{
                    fontFamily:
                      "var(--font-display, 'Poppins', sans-serif)",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    color: "#1F1F1F",
                    margin: 0,
                  }}
                >
                  {selectedCard.name}
                </motion.h3>
                <motion.span
                  layoutId={`card-badge-${selectedCard.id}`}
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    fontFamily:
                      "var(--font-display, 'Poppins', sans-serif)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#fff",
                    background: statusColors[selectedCard.status],
                    padding: "0.2rem 0.65rem",
                    borderRadius: "100px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedCard.status}
                </motion.span>
              </div>

              <motion.p
                layoutId={`card-desc-${selectedCard.id}`}
                style={{
                  fontFamily:
                    "var(--font-body, 'Raleway', sans-serif)",
                  fontSize: "1rem",
                  color: "#777",
                  marginTop: "0.5rem",
                  marginBottom: 0,
                }}
              >
                {selectedCard.description}
              </motion.p>

              {/* Expanded details */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.15, ...springTransition }}
                style={{ marginTop: "1.5rem" }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2px",
                    background: "#6B4EFF",
                    borderRadius: "1px",
                    marginBottom: "1rem",
                    opacity: 0.5,
                  }}
                />
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                  }}
                >
                  {selectedCard.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        ...springTransition,
                        delay: 0.2 + i * 0.08,
                      }}
                      style={{
                        fontFamily:
                          "var(--font-body, 'Raleway', sans-serif)",
                        fontSize: "0.92rem",
                        color: "#1F1F1F",
                        lineHeight: 1.5,
                        paddingLeft: "1rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.55em",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#6B4EFF",
                          opacity: 0.6,
                        }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
