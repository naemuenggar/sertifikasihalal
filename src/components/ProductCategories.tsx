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
  image?: string;
};

const halalCategories: ProductCategory[] = [
  {
    icon: UtensilsCrossed,
    title: "Makanan dan Minuman",
    description: "Produk olahan, minuman, dan bahan pangan yang beredar di pasar Indonesia.",
    image: "halal-makanan_dan_minuman.jpg",
  },
  {
    icon: Pill,
    title: "Suplemen Makanan",
    description: "Vitamin, mineral, dan produk nutrisi yang wajib bersertifikat Halal dan terdaftar BPOM.",
    image: "halal-suplemen_makanan.jpg",
  },
  {
    icon: Sparkles,
    title: "Kosmetik dan Perawatan Diri",
    description: "Skincare, make-up, dan produk perawatan tubuh yang diaplikasikan langsung ke kulit.",
    image: "halal-kosmetik.jpg",
  },
  {
    icon: HeartPulse,
    title: "Alat Kesehatan",
    description: "Perangkat medis yang bersentuhan langsung maupun tidak langsung dengan tubuh.",
    image: "halal-alat_kesehatan.jpg",
  },
  {
    icon: SprayCan,
    title: "Produk Rumah Tangga",
    description: "Bahan pembersih dan produk konsumsi rumah tangga berbahan kimia.",
    image: "halal-produk_rumah_tangga.jpg",
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
    image: "halal-makanan_dan_minuman.jpg",
  },
  {
    icon: Pill,
    title: "Suplemen Kesehatan",
    description: "Vitamin, mineral, dan produk nutrisi sesuai ketentuan keamanan BPOM.",
    image: "halal-suplemen_makanan.jpg",
  },
  {
    icon: Sparkles,
    title: "Produk Kosmetik",
    description: "Skincare, make-up, dan produk perawatan tubuh yang wajib terdaftar di BPOM.",
    image: "halal-kosmetik.jpg",
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
        {categories.map(({ icon: Icon, title, description, image }) => {
          const isPhotoCard = Boolean(image);
          const overlay = theme === "bpom"
            ? "linear-gradient(180deg, rgba(15,40,60,0.15) 0%, rgba(15,40,60,0.75) 100%)"
            : "linear-gradient(180deg, rgba(15,46,31,0.15) 0%, rgba(15,46,31,0.75) 100%)";

          const style = isPhotoCard
            ? {
                backgroundImage: `${overlay}, url('/images/card/${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined;

          return (
            <article
              className={`product-category${isPhotoCard ? " product-category--photo" : ""}`}
              key={title}
              style={style}
            >
              <span className={`product-category__icon product-category__icon--${theme}`} aria-hidden="true">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
    </Carousel>
  );
}

export default function ProductCategories() {
  return (
    <div className="product-categories-wrap">
      <section className="section product-categories__group" id="produk" data-service="halal">
        <div className="wrap">
          <div className="product-categories__head">
            <span className="eyebrow">Cakupan sertifikasi</span>
            <h2 className="h-section">Produk Halal yang Kami Sertifikasi</h2>
            <p className="lead">
              Sertifikasi Halal untuk berbagai kategori produk sesuai ketentuan BPJPH.
            </p>
          </div>
          <ProductCarousel categories={halalCategories} theme="halal" />
        </div>
      </section>

      <section className="section product-categories__group" id="produk-bpom" data-service="bpom">
        <div className="wrap">
          <div className="product-categories__head">
            <span className="eyebrow eyebrow--bpom">Cakupan izin edar</span>
            <h2 className="h-section">Produk BPOM yang Kami Sertifikasi</h2>
            <p className="lead">
              Pendampingan izin edar BPOM untuk produk sesuai ketentuan yang berlaku.
            </p>
          </div>
          <ProductCarousel categories={bpomCategories} theme="bpom" />
        </div>
      </section>
    </div>
  );
}
