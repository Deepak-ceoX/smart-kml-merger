import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";
import { UploadZone } from "@/components/upload/upload-zone";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <UploadZone />
      <Features />
      <Footer />
    </main>
  );
}