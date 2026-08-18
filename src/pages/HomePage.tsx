import Hero from "../components/Hero";
import BeritaSection from "../components/BeritaSection";
import ProductCategories from "../components/ProductCategories";
import Services from "../components/Services";
import Alur from "../components/Alur";
import Packages from "../components/Packages";
import FAQ from "../components/FAQ";
import Clients from "../components/Clients";
import { usePageTitle } from "../hooks/usePageMeta";

export default function HomePage() {
  usePageTitle("Urushalal — Urus Sertifikasi Halal Jadi Gampang");
  return (
    <>
      <Hero />
      <BeritaSection />
      <ProductCategories />
      <Services />
      <Alur />
       <Packages />
       <Clients />
       <FAQ />
    </>
  );
}
