import {
  Boxes,
  HeartPulse,
  Pill,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ProductCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const categories: ProductCategory[] = [
  {
    icon: UtensilsCrossed,
    title: "Makanan dan Minuman",
    description: "Produk olahan, minuman, dan bahan pangan yang beredar di pasar Indonesia.",
  },
  {
    icon: Pill,
    title: "Suplemen Makanan",
    description: "Vitamin, mineral, dan produk nutrisi yang wajib bersertifikat Halal dan terdaftar BPOM.",
  },
  {
    icon: Sparkles,
    title: "Kosmetik dan Perawatan Diri",
    description: "Skincare, make-up, dan produk perawatan tubuh yang diaplikasikan langsung ke kulit.",
  },
  {
    icon: HeartPulse,
    title: "Alat Kesehatan",
    description: "Perangkat medis yang bersentuhan langsung maupun tidak langsung dengan tubuh.",
  },
  {
    icon: SprayCan,
    title: "Produk Rumah Tangga",
    description: "Bahan pembersih dan produk konsumsi rumah tangga berbahan kimia.",
  },
  {
    icon: Boxes,
    title: "Kategori Lainnya",
    description: "Produk farmasi, kemasan pangan, dan kategori lain yang dievaluasi secara khusus.",
  },
];

export default function ProductCategories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    if (dir === -1 && atStart) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }
    if (dir === 1 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const card = el.querySelector<HTMLElement>(".product-category");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="product-categories" id="produk">
      <div className="product-categories__inner">
        <div className="product-categories__top">
          <div className="product-categories__head">
            <span className="eyebrow">Cakupan sertifikasi</span>
            <h2 className="h-section">Produk yang Kami Sertifikasi</h2>
            <p className="lead">
              Sertifikasi Halal untuk berbagai kategori produk sesuai ketentuan BPJPH.
            </p>
          </div>
          <div className="product-categories__nav">
            <button type="button" onClick={() => slide(-1)} aria-label="Kategori sebelumnya">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => slide(1)} aria-label="Kategori berikutnya">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="product-categories__grid" ref={trackRef}>
          {categories.map(({ icon: Icon, title, description }) => (
            <article className="product-category" key={title}>
              <span className="product-category__icon" aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
