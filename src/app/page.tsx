import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/ui/hero";
import { Gallery } from "@/components/gallery";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navigation />
      <Hero />
      <Gallery />
    </main>
  );
}
