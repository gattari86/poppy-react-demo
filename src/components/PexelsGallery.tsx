"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * PexelsGallery
 * A masonry-style image gallery with Framer Motion hover effects
 * and staggered entrance animations.
 *
 * Uses hardcoded Pexels URLs (API key not exposed to client).
 */

const GALLERY_IMAGES = [
  {
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Team meeting around a table",
  },
  {
    src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Strategy planning session",
  },
  {
    src: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Focused laptop work",
  },
  {
    src: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Creative workspace",
  },
  {
    src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Team collaboration",
  },
  {
    src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Group discussion",
  },
];

// Vary heights to create a masonry feel
const HEIGHTS = ["280px", "340px", "300px", "320px", "290px", "350px"];

function GalleryCard({
  image,
  height,
  index,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  height: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.03 }}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        height,
        cursor: "pointer",
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(107, 78, 255, 0.75) 0%, rgba(31, 31, 31, 0.3) 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#F6F4EF",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          View Project
        </span>
      </motion.div>
    </motion.div>
  );
}

export function PexelsGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        padding: "5rem 2rem",
        background: "#F6F4EF",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display, 'Poppins', sans-serif)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "#1F1F1F",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Portfolio Gallery
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body, 'Raleway', sans-serif)",
            fontWeight: 400,
            fontSize: "1rem",
            color: "#888",
            marginTop: "0.6rem",
          }}
        >
          Pexels API + Framer Motion hover effects
        </p>
      </div>

      {/* Masonry grid */}
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.2rem",
          maxWidth: "64rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {isInView &&
          GALLERY_IMAGES.map((image, i) => (
            <GalleryCard
              key={image.src}
              image={image}
              height={HEIGHTS[i]}
              index={i}
            />
          ))}
      </div>
    </section>
  );
}
