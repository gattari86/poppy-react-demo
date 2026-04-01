import { HeroSection } from "@/components/HeroSection";
import { ClientCards } from "@/components/ClientCards";
import { DragReorder } from "@/components/DragReorder";
import { ScrollSection } from "@/components/ScrollSection";
import { AnimatedTabs } from "@/components/AnimatedTabs";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Footer } from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <DarkModeToggle />

      <HeroSection />

      <section className="py-24 px-8">
        <ClientCards />
      </section>

      <section className="py-24 px-8 max-w-4xl mx-auto">
        <DragReorder />
      </section>

      <ScrollSection />

      <section className="py-24 px-8">
        <AnimatedTabs />
      </section>

      <Footer />
    </main>
  );
}
