'use client';

import { useState } from 'react';
import { Reorder, useDragControls, motion } from 'framer-motion';
import { Target, Layout, Phone, BarChart3, Palette, type LucideIcon } from 'lucide-react';

interface TaskItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const initialItems: TaskItem[] = [
  { id: 'ads', label: 'Launch Google Ads campaign', icon: Target },
  { id: 'website', label: 'Redesign client website', icon: Layout },
  { id: 'receptionist', label: 'Set up AI receptionist', icon: Phone },
  { id: 'dashboard', label: 'Build reporting dashboard', icon: BarChart3 },
  { id: 'brand', label: 'Create brand identity', icon: Palette },
];

function GripDots({ dragControls }: { dragControls: ReturnType<typeof useDragControls> }) {
  return (
    <div
      onPointerDown={(e) => dragControls.start(e)}
      style={{
        cursor: 'grab',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 5px)',
        gridTemplateRows: 'repeat(3, 5px)',
        gap: '3px',
        padding: '12px',
        touchAction: 'none',
        minWidth: 48,
        minHeight: 48,
        alignContent: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      aria-label="Drag handle"
      role="button"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: '#666',
          }}
        />
      ))}
    </div>
  );
}

function ReorderItem({
  item,
  index,
}: {
  item: TaskItem;
  index: number;
}) {
  const dragControls = useDragControls();
  const IconComponent = item.icon;

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={dragControls}
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        marginBottom: 10,
      }}
      whileDrag={{
        boxShadow: '0 10px 30px rgba(107, 78, 255, 0.2)',
        scale: 1.02,
        zIndex: 10,
        borderColor: '#6B4EFF',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: 16,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      <motion.div
        layout
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 16,
          padding: 16,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          userSelect: 'none',
        }}
      >
        {/* Number badge */}
        <motion.span
          key={index}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: '#6B4EFF',
            minWidth: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            backgroundColor: 'rgba(107, 78, 255, 0.15)',
            flexShrink: 0,
          }}
        >
          {index + 1}
        </motion.span>

        {/* Icon circle */}
        <div
          style={{
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: '50%',
            backgroundColor: '#6B4EFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComponent size={20} color="#FFFFFF" strokeWidth={2} />
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: 15,
            fontFamily: "'Raleway', sans-serif",
            color: '#E8E6E3',
            fontWeight: 500,
            flex: 1,
          }}
        >
          {item.label}
        </span>

        {/* Grip handle */}
        <GripDots dragControls={dragControls} />
      </motion.div>
    </Reorder.Item>
  );
}

export function DragReorder() {
  const [items, setItems] = useState<TaskItem[]>(initialItems);

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary, #0F0F13)',
        padding: '72px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 560,
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: '#6B4EFF',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          Interactive
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 28,
            fontWeight: 600,
            color: '#E8E6E3',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          Drag to Reorder
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 15,
            color: '#8A8A96',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          Grab any item. Impossible in static HTML.
        </p>

        {/* White card container */}
        <div
          style={{
            backgroundColor: '#1A1A22',
            borderRadius: 20,
            padding: '24px 20px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            style={{
              width: '100%',
              padding: 0,
              margin: 0,
            }}
          >
            {items.map((item, index) => (
              <ReorderItem key={item.id} item={item} index={index} />
            ))}
          </Reorder.Group>
        </div>
      </div>
    </section>
  );
}
