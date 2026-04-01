"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const GALLERY_ITEMS = [
  {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Team meeting around a table",
    name: "Verizon CMC",
  },
  {
    src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Strategy planning session",
    name: "Albedos Return",
  },
  {
    src: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Focused laptop work",
    name: "ReadyNest Safety",
  },
  {
    src: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Creative workspace",
    name: "Negocio Listo",
  },
  {
    src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Team collaboration",
    name: "Mary Moras",
  },
  {
    src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Group discussion",
    name: "Corridos Perrones",
  },
] as const;

function GalleryCard({
  item,
  index,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const height = index % 2 === 0 ? 280 : 360;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover="hovered"
      style={{
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
        height,
        cursor: "pointer",
      }}
    >
      <motion.img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        variants={{
          hovered: { scale: 1.08 },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transformOrigin: "center center",
        }}
      />

      <motion.div
        variants={{
          hovered: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(107,78,255,0.6) 0%, transparent 60%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "1.5rem",
          gap: "0.35rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "1.15rem",
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontWeight: 500,
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.03em",
          }}
        >
          View Project &rarr;
        </span>
      </motion.div>
    </motion.div>
  );
}

export function PexelsGallery() {
  return (
    <section
      style={{
        padding: "6rem 2rem",
        background: "var(--bg-primary, #F6F4EF)",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "#6B4EFF",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Portfolio
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            color: "#E8E6E3",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Work That Speaks
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontWeight: 400,
            fontSize: "1.05rem",
            color: "#8A8A96",
            marginTop: "0.75rem",
          }}
        >
          Pexels API integration + Framer Motion hover effects
        </p>
      </div>

      {/* Masonry grid */}
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          maxWidth: "68rem",
          marginInline: "auto",
        }}
        className="pexels-grid"
      >
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard key={item.src} item={item} index={i} />
        ))}
      </div>

      <style>{`
        .pexels-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .pexels-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .pexels-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 639px) {
          .pexels-grid > div {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
