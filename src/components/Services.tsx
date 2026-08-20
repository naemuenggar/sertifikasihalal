import {
  Award,
  ClipboardCheck,
  FileText,
  MessagesSquare,
  PackageSearch,
  type LucideIcon,
} from "lucide-react";
import Carousel from "./Carousel";
import { useCarousel } from "../hooks/useCarousel";
import { useLanguage } from "../i18n/LanguageContext";

/** Ikon tiap kartu (bahasa-netral), urutannya mengikuti t.serviceCards.items. */
const serviceIcons: LucideIcon[] = [
  MessagesSquare,
  FileText,
  ClipboardCheck,
  Award,
  PackageSearch,
];

export default function Services() {
  const { t } = useLanguage();
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".svc-carousel__card");

  return (
    <section className="section" id="layanan" data-service="halal">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">{t.serviceCards.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              {t.serviceCards.title}
            </h2>
          </div>
        </div>

        <Carousel
          progress={progress}
          ratio={ratio}
          onPrev={() => slide(-1)}
          onNext={() => slide(1)}
          prevLabel={t.serviceCards.prevLabel}
          nextLabel={t.serviceCards.nextLabel}
        >
          <div className="svc-carousel" ref={trackRef}>
            {t.serviceCards.items.map(({ title, desc, tag }, i) => {
              const Icon = serviceIcons[i];
              const iconClass = "svc__icon svc__icon--halal";
              return (
                <article className="svc svc-carousel__card" key={title}>
                  <span className={iconClass} aria-hidden="true">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="svc__tag">{tag}</span>
                </article>
              );
            })}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
