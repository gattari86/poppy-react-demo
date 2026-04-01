'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatConfig {
  value: string;       // e.g. "14", "97", "$2.4M"
  label: string;
  prefix?: string;
  suffix?: string;
  numeric: number;     // the raw number to count toward
  decimals?: number;   // decimal places (e.g. 1 for 2.4)
}

interface ParallaxOrbProps {
  size: number;
  left: string;
  top: string;
  speed: number;
  color?: string;
  blur?: number;
  opacity?: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS: StatConfig[] = [
  { value: '14', label: 'Active Clients', numeric: 14 },
  { value: '97%', label: 'Client Retention', numeric: 97, suffix: '%' },
  { value: '$2.4M', label: 'Revenue Influenced', numeric: 2.4, prefix: '$', suffix: 'M', decimals: 1 },
];

const VIDEO_SRC =
  'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4';

const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #0F0F13, #1a1033, #0F0F13)';

// ---------------------------------------------------------------------------
// SlotDigit -- single digit that rolls like a slot machine
// ---------------------------------------------------------------------------

function SlotDigit({ digit, animate }: { digit: string; animate: boolean }) {
  // If the character is not a numeric digit, render it statically (e.g. ".")
  const isNumeric = /^[0-9]$/.test(digit);
  const target = isNumeric ? parseInt(digit, 10) : 0;

  if (!isNumeric) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: digit === '.' ? '0.35em' : '0.6em',
          textAlign: 'center',
        }}
      >
        {digit}
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        height: '1.15em',
        overflow: 'hidden',
        position: 'relative',
        width: '0.65em',
        textAlign: 'center',
      }}
    >
      <motion.span
        initial={{ y: 0 }}
        animate={animate ? { y: `-${target * 1.15}em` } : { y: 0 }}
        transition={{
          duration: 2,
          ease: [0.16, 1, 0.3, 1], // custom ease-out for a satisfying deceleration
          delay: Math.random() * 0.3, // stagger each digit slightly
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            style={{
              height: '1.15em',
              lineHeight: '1.15em',
              display: 'block',
            }}
          >
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// SlotCounter -- decomposes a formatted value into individual slot digits
// ---------------------------------------------------------------------------

function SlotCounter({ stat }: { stat: StatConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Build the final display string: e.g. "$2.4M" -> prefix + digits + suffix
  const finalDigits = useMemo(() => {
    // Format the numeric value
    const formatted =
      stat.decimals != null
        ? stat.numeric.toFixed(stat.decimals)
        : String(stat.numeric);
    return formatted;
  }, [stat.numeric, stat.decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        textAlign: 'center',
        flex: '1 1 200px',
        minWidth: '160px',
        padding: '20px 0',
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.15,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        {stat.prefix && (
          <span style={{ color: '#6B4EFF' }}>{stat.prefix}</span>
        )}
        {finalDigits.split('').map((char, i) => (
          <SlotDigit key={`${char}-${i}`} digit={char} animate={isInView} />
        ))}
        {stat.suffix && (
          <span style={{ color: '#6B4EFF', fontSize: '0.55em', marginLeft: '2px' }}>
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginTop: '12px',
          display: 'block',
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ParallaxOrb
// ---------------------------------------------------------------------------

function ParallaxOrb({
  size,
  left,
  top,
  speed,
  color = 'rgba(107, 78, 255, 0.12)',
  blur = 80,
  opacity = 0.15,
  scrollYProgress,
}: ParallaxOrbProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 25 });

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        left,
        top,
        y: smoothY,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// VideoBackground -- ambient looping video with overlay
// ---------------------------------------------------------------------------

function VideoBackground() {
  const [videoFailed, setVideoFailed] = useState(false);

  const handleError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  if (videoFailed) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: FALLBACK_GRADIENT,
          zIndex: 0,
        }}
      />
    );
  }

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        onError={handleError}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      {/* Dark overlay to keep text readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 15, 19, 0.7)',
          zIndex: 1,
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// ScrollSection (exported)
// ---------------------------------------------------------------------------

export function ScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#0F0F13',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
      }}
    >
      {/* Ambient video background */}
      <VideoBackground />

      {/* Parallax orbs */}
      <ParallaxOrb
        size={320}
        left="-100px"
        top="10%"
        speed={-160}
        color="rgba(107, 78, 255, 0.10)"
        blur={100}
        opacity={0.18}
        scrollYProgress={scrollYProgress}
      />
      <ParallaxOrb
        size={200}
        left="70%"
        top="5%"
        speed={-90}
        color="rgba(140, 100, 255, 0.08)"
        blur={70}
        opacity={0.12}
        scrollYProgress={scrollYProgress}
      />
      <ParallaxOrb
        size={160}
        left="45%"
        top="65%"
        speed={-200}
        color="rgba(107, 78, 255, 0.14)"
        blur={90}
        opacity={0.2}
        scrollYProgress={scrollYProgress}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#6B4EFF',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          By The Numbers
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '64px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Results That Speak
        </motion.h2>

        {/* Stat counters row -- stacks on mobile via flex-wrap */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((stat) => (
            <SlotCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
