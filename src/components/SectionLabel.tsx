"use client";

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle: string;
}

function SectionLabel({ label, title, subtitle }: SectionLabelProps) {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <p
        style={{
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#6B4EFF",
          fontSize: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display), 'Poppins', sans-serif",
          fontSize: "2.5rem",
          color: "#1F1F1F",
          fontWeight: 700,
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "1.1rem",
          color: "#555",
          maxWidth: "640px",
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default SectionLabel;
