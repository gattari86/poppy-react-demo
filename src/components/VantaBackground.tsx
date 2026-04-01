"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VantaBackground -- wraps the Vanta.js HALO effect for React/Next.js.
 *
 * Loads Three.js and Vanta from CDN at runtime so there is no bundled
 * dependency on either library. Colors are tuned to the Poppy brand
 * palette (deep purple tint on near-black).
 */
export default function VantaBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const loadVanta = async () => {
      // Avoid double-loading if scripts are already on the page.
      if (!(window as any).THREE) {
        const threeScript = document.createElement("script");
        threeScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        document.head.appendChild(threeScript);
        await new Promise<void>((resolve) => {
          threeScript.onload = () => resolve();
        });
      }

      if (!(window as any).VANTA?.HALO) {
        const vantaScript = document.createElement("script");
        vantaScript.src =
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js";
        document.head.appendChild(vantaScript);
        await new Promise<void>((resolve) => {
          vantaScript.onload = () => resolve();
        });
      }

      if (cancelled) return;

      if (vantaRef.current && (window as any).VANTA) {
        const effect = (window as any).VANTA.HALO({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          // Poppy brand -- dark purple tint
          baseColor: 0x1a1033,
          // Near black background
          backgroundColor: 0x0f0f13,
          amplitudeFactor: 1.5,
          size: 1.5,
        });
        setVantaEffect(effect);
      }
    };

    loadVanta();

    return () => {
      cancelled = true;
      if (vantaEffect) vantaEffect.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{ width: "100%", minHeight: "100vh", position: "relative" }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
