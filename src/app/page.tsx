import NavHeader from "@/components/NavHeader";
import Hero from "@/components/Hero";
import PlatformsSection from "@/components/PlatformsSection";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        fontFamily: "var(--font-body)",
        background: "var(--page-white)",
        color: "var(--text-black)",
      }}
    >
      <NavHeader />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col mt-16 md:mt-[56px] px-6 md:px-10 pt-7 pb-8">
        <Hero />
        <PlatformsSection />
        <Carousel />
      </main>

      <Footer />
    </div>
  );
}
