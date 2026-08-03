import {
  Boxes,
  HeartPulse,
  Pill,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Carousel from "./Carousel";
import { useCarousel } from "../hooks/useCarousel";

type ProductCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const halalCategories: ProductCategory[] = [
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

const bpomCategories: ProductCategory[] = [
  {
    icon: UtensilsCrossed,
    title: "Makanan dan Minuman",
    description: "Produk pangan olahan dan minuman yang memerlukan izin edar BPOM.",
  },
  {
    icon: Pill,
    title: "Suplemen Kesehatan",
    description: "Vitamin, mineral, dan produk nutrisi sesuai ketentuan keamanan BPOM.",
  },
  {
    icon: Sparkles,
    title: "Produk Kosmetik",
    description: "Skincare, make-up, dan produk perawatan tubuh yang wajib terdaftar di BPOM.",
  },
];

type ProductCarouselProps = {
  categories: ProductCategory[];
  theme: "halal" | "bpom";
};

function ProductCarousel({ categories, theme }: ProductCarouselProps) {
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".product-category");

  return (
    <Carousel
      progress={progress}
      ratio={ratio}
      onPrev={() => slide(-1)}
      onNext={() => slide(1)}
      prevLabel={`Kategori ${theme} sebelumnya`}
      nextLabel={`Kategori ${theme} berikutnya`}
    >
      <div className="product-categories__grid" ref={trackRef}>
        {categories.map(({ icon: Icon, title, description }) => (
          <article className="product-category" key={title}>
            <span className={`product-category__icon product-category__icon--${theme}`} aria-hidden="true">
              <Icon size={24} strokeWidth={1.8} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </Carousel>
  );
}

export default function ProductCategories() {
  return (
    <section className="product-categories" id="produk">
      <div className="product-categories__inner">
        <div className="product-categories__group">
          <div className="product-categories__head">
            <span className="eyebrow">Cakupan sertifikasi</span>
            <h2 className="h-section">Produk Halal yang Kami Sertifikasi</h2>
            <p className="lead">
              Sertifikasi Halal untuk berbagai kategori produk sesuai ketentuan BPJPH.
            </p>
          </div>
          <ProductCarousel categories={halalCategories} theme="halal" />
        </div>

        <div className="product-categories__group">
          <div className="product-categories__head">
            <span className="eyebrow eyebrow--bpom">Cakupan izin edar</span>
            <h2 className="h-section">Produk BPOM yang Kami Sertifikasi</h2>
            <p className="lead">
              Pendampingan izin edar BPOM untuk produk sesuai ketentuan yang berlaku.
            </p>
          </div>
          <ProductCarousel categories={bpomCategories} theme="bpom" />
        </div>
      </div>
    </section>
  );
}
