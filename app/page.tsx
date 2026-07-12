import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Footer } from "@/components/layout/footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}