'use client';

import { useState } from 'react';
import { Reorder, useDragControls, motion } from 'framer-motion';

interface TaskItem {
  id: number;
  label: string;
}

const initialItems: TaskItem[] = [
  { id: 1, label: 'Launch Google Ads campaign' },
  { id: 2, label: 'Redesign client website' },
  { id: 3, label: 'Set up AI receptionist' },
  { id: 4, label: 'Build monthly reporting dashboard' },
  { id: 5, label: 'Create brand identity package' },
];

function GripHandle({ dragControls }: { dragControls: ReturnType<typeof useDragControls> }) {
  return (
    <div
      onPointerDown={(e) => dragControls.start(e)}
      style={{
        cursor: 'grab',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 6px)',
        gridTemplateRows: 'repeat(3, 6px)',
        gap: '3px',
        padding: '8px 12px 8px 8px',
        touchAction: 'none',
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor: '#a0a0a0',
          }}
        />
      ))}
    </div>
  );
}

function ReorderItem({ item }: { item: TaskItem }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={dragControls}
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
      whileDrag={{
        boxShadow: '0 8px 24px rgba(107, 78, 255, 0.25)',
        scale: 1.02,
        zIndex: 10,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '10px',
          border: '1px solid #E8E6E1',
          transition: 'border-color 0.2s',
          userSelect: 'none',
        }}
        whileHover={{
          borderColor: '#6B4EFF',
        }}
      >
        <GripHandle dragControls={dragControls} />
        <span
          style={{
            fontSize: '15px',
            fontFamily: "'Raleway', sans-serif",
            color: '#1F1F1F',
            fontWeight: 500,
          }}
        >
          {item.label}
        </span>
      </motion.div>
    </Reorder.Item>
  );
}

export function DragReorder() {
  const [items, setItems] = useState<TaskItem[]>(initialItems);

  return (
    <section
      style={{
        backgroundColor: '#F6F4EF',
        padding: '60px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '28px',
          fontWeight: 600,
          color: '#1F1F1F',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        Drag to Reorder
      </h2>
      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '15px',
          color: '#6B6B6B',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        Grab any item and move it. Try this in static HTML.
      </p>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item) => (
          <ReorderItem key={item.id} item={item} />
        ))}
      </Reorder.Group>
    </section>
  );
}
