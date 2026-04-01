import { HeroSection } from "@/components/HeroSection";
import { ClientCards } from "@/components/ClientCards";
import { DragReorder } from "@/components/DragReorder";
import { ScrollSection } from "@/components/ScrollSection";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Footer } from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { PexelsGallery } from "@/components/PexelsGallery";
import { FilmGrain } from "@/components/FilmGrain";

export default function Home() {
  return (
    <main>
      <FilmGrain />
      <ScrollProgress />
      <DarkModeToggle />
      <HeroSection />
      <section style={{ padding: "6rem 2rem", background: "var(--bg-primary)" }}>
        <ClientCards />
      </section>
      <section style={{ padding: "6rem 2rem", background: "var(--bg-primary)" }}>
        <DragReorder />
      </section>
      <ScrollSection />
      <section style={{ padding: "6rem 2rem", background: "var(--bg-primary)" }}>
        <AnimatedTabs />
      </section>
      <section style={{ padding: "6rem 2rem", background: "var(--bg-primary)" }}>
        <PexelsGallery />
      </section>
      <Footer />
    </main>
  );
}
