import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Applications from "@/components/Applications";
import StatsSection from "@/components/StatsSection";
import Certifications from "@/components/Certifications";
import ClientStrip from "@/components/ClientStrip";
import ContactForm from "@/components/ContactForm";
import ProductCable from "@/components/ProductCable";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      {/* Wrapper - Do not use overflow-hidden here, it breaks CSS sticky position. Instead we will rely on clipping the canvas container. */}
      <div className="relative w-full">
        {/* Global 3D Cable Sidebar Positioned on the Left */}
        <div className="absolute left-0 top-0 w-[10%] h-full z-[50] pointer-events-none lg:pointer-events-auto">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-start justify-center">
            <div className="w-full h-full relative">
              <ProductCable />
            </div>
            
            <div className="absolute -left-10 top-1/2 -rotate-90 origin-center select-none pointer-events-none opacity-[0.04] mix-blend-difference">
              <span className="text-[6rem] font-black text-white tracking-[0.2em] whitespace-nowrap uppercase mix-blend-difference">
                Solutions
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <ProductCategories />
          <StatsSection />
          <Applications />
          <Certifications />
          <ContactForm />
          <Footer />
        </div>
      </div>
    </>
  );
}
