import {
  Boxes,
  HeartPulse,
  Pill,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import CarouselControls from "./CarouselControls";
import { useCarousel } from "../hooks/useCarousel";

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
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".product-category");

  return (
    <section className="product-categories" id="produk">
      <div className="product-categories__inner">
        <div className="product-categories__head">
          <span className="eyebrow">Cakupan sertifikasi</span>
          <h2 className="h-section">Produk yang Kami Sertifikasi</h2>
          <p className="lead">
            Sertifikasi Halal untuk berbagai kategori produk sesuai ketentuan BPJPH.
          </p>
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

        <CarouselControls
          progress={progress}
          ratio={ratio}
          onPrev={() => slide(-1)}
          onNext={() => slide(1)}
          prevLabel="Kategori sebelumnya"
          nextLabel="Kategori berikutnya"
        />
      </div>
    </section>
  );
}
