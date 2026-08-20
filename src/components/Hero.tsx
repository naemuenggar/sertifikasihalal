import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroSlides } from "../data/heroSlides";
import { HERO_AUTOPLAY_MS, useHeroSlider } from "../hooks/useHeroSlider";
import { useLanguage } from "../i18n/LanguageContext";
import HeroSlide from "./HeroSlide";

export default function Hero() {
  const { t } = useLanguage();
  const slides = getHeroSlides(t.hero.slides);
  const total = slides.length;
  const { index, goTo, step, isAutoplaying, pause, resume, onTouchStart, onTouchEnd, onKeyDown } =
    useHeroSlider(total);
  const active = slides[index];

  return (
    <section
      className="hero"
      id="top"
      data-service="neutral"
      // data-theme di section hanya dipakai kontrol slider. Warna tiap panel
      // datang dari data-theme milik slide-nya sendiri, supaya slide yang sedang
      // memudar keluar tidak ikut berganti palet di tengah transisi.
      data-theme={active.theme}
      aria-roledescription="carousel"
      aria-label={t.hero.ariaLabel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      <div className="hero__slides">
        {slides.map((slide, i) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={i === index}
            position={i + 1}
            total={total}
          />
        ))}
      </div>

      {total > 1 && (
        <div className="hero__controls" data-autoplay={isAutoplaying} role="group" aria-label={t.hero.controlsLabel}>
          <button
            type="button"
            className="hero-ctl"
            onClick={() => step(-1)}
            aria-label={t.hero.prevSlide}
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden />
          </button>

          <div className="hero__dots">
            {slides.map((slide, i) => (
              <button
                type="button"
                key={slide.id}
                className="hero-dot"
                data-active={i === index}
                aria-label={t.hero.showSlide(slide.name)}
                aria-current={i === index}
                onClick={() => goTo(i)}
              >
                {/* Bar yang mengisi = sisa waktu sebelum auto-slide. Durasinya
                    diambil dari sumber yang sama dengan timernya. */}
                <span
                  className="hero-dot__fill"
                  style={{ animationDuration: `${HERO_AUTOPLAY_MS}ms` }}
                  aria-hidden
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="hero-ctl"
            onClick={() => step(1)}
            aria-label={t.hero.nextSlide}
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {t.hero.slideStatus(index + 1, total, active.name)}
      </p>
    </section>
  );
}
