export function Footer() {
  return (
    <footer className="w-full py-12 px-4 text-center border-t border-[#E9E6FF]">
      <p className="text-sm opacity-60 mb-1">
        Built with Next.js + Framer Motion + Tailwind CSS
      </p>
      <p className="text-sm opacity-50 mb-4">
        This is what React can do that static HTML cannot.
      </p>
      <p
        className="text-sm font-semibold"
        style={{
          color: "#6B4EFF",
          fontFamily: "var(--font-poppins, Poppins, sans-serif)",
        }}
      >
        Poppy Marketing and Consulting
      </p>
    </footer>
  );
}
