import {
  Boxes,
  HeartPulse,
  Pill,
  Sparkles,
  SprayCan,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Carousel from "./Carousel";
import { useCarousel } from "../hooks/useCarousel";
import { useLanguage } from "../i18n/LanguageContext";

/** Ikon & foto tiap kartu (bahasa-netral). Urutan mengikuti items di i18n. */
const halalCardMeta: { icon: LucideIcon; image?: string }[] = [
  { icon: UtensilsCrossed, image: "halal-makanan_dan_minuman.jpg" },
  { icon: Pill, image: "halal-suplemen_makanan.jpg" },
  { icon: Sparkles, image: "halal-kosmetik.jpg" },
  { icon: Truck, image: "halal-logistik.jpg" },
  { icon: HeartPulse, image: "halal-barang_gunaan.jpg" },
  { icon: SprayCan, image: "halal-produk_rumah_tangga.jpg" },
  { icon: Boxes },
];

const bpomCardMeta: { icon: LucideIcon; image?: string }[] = [
  { icon: UtensilsCrossed, image: "halal-makanan_dan_minuman.jpg" },
  { icon: Pill, image: "halal-suplemen_makanan.jpg" },
  { icon: Sparkles, image: "halal-kosmetik.jpg" },
];

type ProductCarouselProps = {
  items: { title: string; description: string }[];
  meta: { icon: LucideIcon; image?: string }[];
  theme: "halal" | "bpom";
};

function ProductCarousel({ items, meta, theme }: ProductCarouselProps) {
  const { t } = useLanguage();
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".product-category");
  const themeLabel = t.products.themeLabel[theme];

  return (
    <Carousel
      progress={progress}
      ratio={ratio}
      onPrev={() => slide(-1)}
      onNext={() => slide(1)}
      prevLabel={t.products.prevLabel(themeLabel)}
      nextLabel={t.products.nextLabel(themeLabel)}
    >
      <div className="product-categories__grid" ref={trackRef}>
        {items.map(({ title, description }, i) => {
          const { icon: Icon, image } = meta[i];
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
  const { t } = useLanguage();

  return (
    <div className="product-categories-wrap">
      <section className="section product-categories__group" id="produk" data-service="halal">
        <div className="wrap">
          <div className="product-categories__head">
            <span className="eyebrow">{t.products.halal.eyebrow}</span>
            <h2 className="h-section">{t.products.halal.title}</h2>
            <p className="lead">{t.products.halal.lead}</p>
          </div>
          <ProductCarousel items={t.products.halal.items} meta={halalCardMeta} theme="halal" />
        </div>
      </section>

      <section className="section product-categories__group" id="produk-bpom" data-service="bpom">
        <div className="wrap">
          <div className="product-categories__head">
            <span className="eyebrow eyebrow--bpom">{t.products.bpom.eyebrow}</span>
            <h2 className="h-section">{t.products.bpom.title}</h2>
            <p className="lead">{t.products.bpom.lead}</p>
          </div>
          <ProductCarousel items={t.products.bpom.items} meta={bpomCardMeta} theme="bpom" />
        </div>
      </section>
    </div>
  );
}
