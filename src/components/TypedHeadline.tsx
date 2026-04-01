"use client";

import { TypeAnimation } from "react-type-animation";

/**
 * TypedHeadline
 * A typewriter-effect headline that cycles through provided strings.
 * Uses react-type-animation under the hood.
 *
 * Usage:
 *   <TypedHeadline
 *     sequences={["landing pages.", "client portals.", "brand experiences.", "AI dashboards."]}
 *   />
 *
 * Props:
 *   sequences - array of strings to cycle through
 *   className - optional CSS class for the wrapper
 */

interface TypedHeadlineProps {
  sequences: string[];
  className?: string;
}

export function TypedHeadline({ sequences, className }: TypedHeadlineProps) {
  // Build the react-type-animation sequence:
  // Each string is followed by a pause (1800ms), then it deletes and types next.
  const animationSequence = sequences.flatMap((text) => [text, 1800]);

  return (
    <div className={className}>
      <style>{`
        .typed-headline-cursor::after {
          content: '|';
          color: #6B4EFF;
          animation: typed-blink 0.7s step-end infinite;
          margin-left: 2px;
          font-weight: 300;
        }
        @keyframes typed-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <span
        style={{
          fontFamily: "var(--font-display, 'Poppins', sans-serif)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          lineHeight: 1.15,
          color: "#1F1F1F",
          display: "inline-flex",
          alignItems: "baseline",
        }}
      >
        <span style={{ marginRight: "0.35em" }}>We build</span>
        <TypeAnimation
          sequence={animationSequence}
          wrapper="span"
          speed={50}
          deletionSpeed={65}
          repeat={Infinity}
          cursor={false}
          className="typed-headline-cursor"
          style={{
            color: "#6B4EFF",
            display: "inline-block",
          }}
        />
      </span>
    </div>
  );
}
