"use client";

import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * LottieAccent -- renders a Lottie animation from a remote URL.
 *
 * Uses @lottiefiles/dotlottie-react for rendering. Supports both
 * .lottie and .json source files. Falls back to an empty container
 * if the source fails to load.
 *
 * Example usage:
 *   <LottieAccent
 *     src="https://lottie.host/a0b1c2d3-e4f5-6789-abcd-ef0123456789/animation.lottie"
 *     width={200}
 *     height={200}
 *   />
 */
export default function LottieAccent({
  src,
  width = 200,
  height = 200,
}: {
  src: string;
  width?: number;
  height?: number;
}) {
  if (!src) return null;

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DotLottieReact
        src={src}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
