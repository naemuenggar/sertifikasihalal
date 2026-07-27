import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Packages from "./components/Packages";
import Articles from "./components/Articles";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { WhatsApp } from "./components/icons";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Packages />
        <Articles />
        <FAQ />
      </main>
      <Footer />
      <a
        className="wa-fab"
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
      >
        <WhatsApp />
      </a>
    </>
  );
}
