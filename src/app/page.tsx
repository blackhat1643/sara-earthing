import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import Applications from "@/components/Applications";
import StatsSection from "@/components/StatsSection";
import Certifications from "@/components/Certifications";
import ClientStrip from "@/components/ClientStrip";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <ProductCategories />
      <StatsSection />
      <Applications />
      <Certifications />
      <ContactForm />
    </>
  );
}
