export function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#0F0F13",
        color: "#E8E6E3",
        padding: "64px 24px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Three-column grid (single column on mobile via CSS) */}
        <div className="footer-grid">
          {/* Column 1: Tech Stack */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#6B4EFF",
                marginBottom: 16,
              }}
            >
              Tech Stack
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {["Next.js", "Framer Motion", "Tailwind CSS", "Lucide React", "Pexels"].map(
                (item) => (
                  <li
                    key={item}
                    style={{ fontSize: "0.875rem", color: "#9E9BA3" }}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2: Philosophy */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#6B4EFF",
                marginBottom: 16,
              }}
            >
              Philosophy
            </h4>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#9E9BA3",
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              Systems beat tools.
              <br />
              Leverage beats effort.
            </p>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-poppins, Poppins, sans-serif)",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#6B4EFF",
                marginBottom: 16,
              }}
            >
              Contact
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: "0.875rem",
                color: "#9E9BA3",
              }}
            >
              <a
                href="https://poppymarketingandconsulting.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9E9BA3", textDecoration: "none" }}
              >
                poppymarketingandconsulting.com
              </a>
              <span>(941) 777-4933</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: 48,
            paddingTop: 32,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#6B6873",
              marginBottom: 6,
            }}
          >
            Built with Next.js + Framer Motion + Tailwind CSS + Lucide React
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#E8E6E3",
              marginBottom: 16,
            }}
          >
            The full Poppy creative stack, rebuilt for React.
          </p>
          <p
            style={{
              fontFamily: "var(--font-poppins, Poppins, sans-serif)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "#6B4EFF",
            }}
          >
            Poppy Marketing and Consulting
          </p>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
