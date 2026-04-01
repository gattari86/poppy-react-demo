"use client";

/**
 * FilmGrain
 * A full-screen overlay that adds a subtle film grain texture.
 * Absolutely positioned, pointer-events none, sits above backgrounds
 * but below interactive elements.
 *
 * Uses an inline SVG filter for the noise pattern -- no external assets.
 */

export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9000,
        opacity: 0.03,
        mixBlendMode: "multiply",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        <filter id="poppy-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#poppy-grain)"
        />
      </svg>
    </div>
  );
}
