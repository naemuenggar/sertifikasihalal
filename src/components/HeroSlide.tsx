import { Fragment } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { HeroSlideData } from "../data/heroSlides";
import { useLanguage } from "../i18n/LanguageContext";
import ScrollLink from "./ScrollLink";
import WaLink from "./WaLink";

type Props = {
  slide: HeroSlideData;
  isActive: boolean;
  /** Nomor urut mulai dari 1 — dibacakan pembaca layar sebagai "1 dari 2". */
  position: number;
  total: number;
};

/** Satu panel hero. Murni presentasional: seluruh warnanya datang dari
 *  `data-theme`, seluruh isinya dari `slide`. */
export default function HeroSlide({ slide, isActive, position, total }: Props) {
  const { t } = useLanguage();
  return (
    <div
      className="hero-slide"
      data-theme={slide.theme}
      data-active={isActive}
      role="group"
      aria-roledescription="slide"
      aria-label={t.hero.slideAria(position, total, slide.name)}
      aria-hidden={!isActive}
      style={
        {
          "--h-photo": `url("${slide.photo}")`,
          "--h-photo-portrait": `url("${slide.photoPortrait}")`,
        } as CSSProperties
      }
    >
      <div className="hero__bg" aria-hidden />
      <div className="hero__overlay" aria-hidden />
      <div className="hero__glow" aria-hidden />

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="hero__badge">
            {/* Teks badge sudah menyampaikan maknanya — logo ini pelengkap
                visual, jadi alt dikosongkan. */}
            <img className="hero__badge-logo" src={slide.badgeLogo} alt="" />
            {slide.badge}
          </p>

          <h1 className="hero__title">
            {/* Spasi eksplisit: <em> di-block lewat CSS, jadi tidak terlihat —
                tapi tanpa ini screen reader & snippet SEO membaca "Halal,Nilai". */}
            {slide.titleHead}{" "}
            <em>
              {slide.titleAccent.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </em>
          </h1>

          <div className="hero__rule" aria-hidden />

          <p className="hero__lead">{slide.lead}</p>

          <ul className="hero__features">
            {slide.features.map(({ icon: Icon, title, desc }) => (
              <li className="hero-feature" key={title}>
                <span className="hero-feature__icon" aria-hidden>
                  <Icon size={28} strokeWidth={1.6} />
                </span>
                <span className="hero-feature__title">{title}</span>
                <span className="hero-feature__desc">{desc}</span>
              </li>
            ))}
          </ul>

          <div className="hero__cta">
            <WaLink className="btn btn--solid" message={slide.waMessage}>
              <MessageCircle size={18} strokeWidth={1.8} aria-hidden />
              {t.common.startFreeConsult}
            </WaLink>
            <ScrollLink to={slide.ctaSecondary.to} className="btn btn--ghost">
              {slide.ctaSecondary.label}
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
            </ScrollLink>
          </div>
        </div>
      </div>

      <div className="wrap hero__stats-wrap">
        <ul className="hero__stats">
          {slide.stats.map(({ icon: Icon, num, label }) => (
            <li className="hero-stat" key={num}>
              <span className="hero-stat__icon" aria-hidden>
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <span className="hero-stat__num">{num}</span>
              <span className="hero-stat__lbl">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
