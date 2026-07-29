import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCategories from "./components/ProductCategories";
import Services from "./components/Services";
import Process from "./components/Process";
import Packages from "./components/Packages";
import Articles from "./components/Articles";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HalalDeadlineModal from "./components/HalalDeadlineModal";
import { WhatsApp } from "./components/icons";
import { WA_LINK } from "./utils/contact";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Articles />
        <ProductCategories />
        <Services />
        <Process />
        <Packages />
        <FAQ />
      </main>
      <Footer />
      <HalalDeadlineModal />
      <a
        className="wa-fab"
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
      >
        <WhatsApp />
      </a>
    </>
  );
}
