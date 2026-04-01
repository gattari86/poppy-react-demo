'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion';

function AnimatedCounter({
  target,
  prefix,
  suffix,
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      setDisplay(String(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  const formatted = `${prefix ?? ''}${display}${suffix ?? ''}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      style={{
        textAlign: 'center',
        flex: '1 1 160px',
        minWidth: '140px',
      }}
    >
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '48px',
          fontWeight: 600,
          color: '#6B4EFF',
          lineHeight: 1.1,
          display: 'block',
        }}
      >
        {formatted}
      </span>
      <span
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '15px',
          color: '#B0ADA8',
          marginTop: '8px',
          display: 'block',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function ParallaxOrb({
  size,
  left,
  top,
  speed,
  scrollYProgress,
}: {
  size: number;
  left: string;
  top: string;
  speed: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 30% 30%, rgba(107, 78, 255, 0.15), rgba(107, 78, 255, 0.03))',
        left,
        top,
        y: smoothY,
        pointerEvents: 'none',
      }}
    />
  );
}

export function ScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const smoothLineScale = useSpring(lineScaleX, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#1F1F1F',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '420px',
      }}
    >
      {/* Parallax background orbs */}
      <ParallaxOrb
        size={200}
        left="-60px"
        top="20%"
        speed={-120}
        scrollYProgress={scrollYProgress}
      />
      <ParallaxOrb
        size={140}
        left="75%"
        top="10%"
        speed={-80}
        scrollYProgress={scrollYProgress}
      />
      <ParallaxOrb
        size={100}
        left="50%"
        top="60%"
        speed={-180}
        scrollYProgress={scrollYProgress}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '28px',
            fontWeight: 600,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          Scroll-Linked Animations
        </h2>

        {/* Gradient line that scales with scroll */}
        <motion.div
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #6B4EFF, #9B85FF)',
            borderRadius: '2px',
            margin: '0 auto 48px',
            maxWidth: '400px',
            scaleX: smoothLineScale,
            transformOrigin: 'left',
          }}
        />

        {/* Stat counters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          <AnimatedCounter target={14} label="Active Clients" />
          <AnimatedCounter target={97} suffix="%" label="Client Retention" />
          <AnimatedCounter
            target={24}
            prefix="$"
            suffix="M"
            label="Revenue Influenced"
          />
        </div>
      </div>
    </section>
  );
}
