import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedNews, localizedNews } from "../lib/news";
import type { News } from "../lib/types";
import { formatDate } from "../utils/date";
import { useCarousel } from "../hooks/useCarousel";
import { useLanguage } from "../i18n/LanguageContext";
import Carousel from "./Carousel";
import { LogoMark } from "./icons";

/** Placeholder saat berita belum punya thumbnail. */
function FeaturedPlaceholder() {
  return (
    <span className="art-feat__placeholder" aria-hidden="true">
      <LogoMark size={56} />
    </span>
  );
}

function readingTime(content: string | null): number {
  const words = content?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Section "Berita" di beranda — menggantikan "Jurnal & Catatan".
 * Data dinamis dari tabel `news` (hanya yang Published), terbaru dulu.
 */
export default function BeritaSection() {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(
    ".news-carousel__card",
    items.length
  );

  useEffect(() => {
    let active = true;
    fetchPublishedNews({ limit: 8 }).then(({ items, error }) => {
      if (!active) return;
      setItems(items);
      setError(error ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  // Sembunyikan hanya jika query berhasil dan memang belum ada berita.
  if (!loading && !error && items.length === 0) return null;

  return (
    <section className="section" id="berita" data-service="neutral">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">{t.news.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              {t.news.homeTitle}
            </h2>
          </div>
          <Link to="/berita" className="section__link">
            {t.news.allNews}
          </Link>
        </div>

        {loading ? (
          <div className="news-skeleton">
            {[1, 2, 3].map((i) => (
              <div className="news-skeleton__card" key={i}>
                <div className="news-skeleton__media shimmer" />
                <div className="news-skeleton__body">
                  <div className="news-skeleton__line shimmer" style={{ width: "70%" }} />
                  <div className="news-skeleton__line shimmer" style={{ width: "90%" }} />
                  <div className="news-skeleton__line shimmer" style={{ width: "40%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="news-load-error">
            <p>{t.news.loadError}</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => window.location.reload()}
            >
              {t.news.retry}
            </button>
          </div>
        ) : (
          <div className="news-carousel">
            <Carousel
              progress={progress}
              ratio={ratio}
              onPrev={() => slide(-1)}
              onNext={() => slide(1)}
              prevLabel={t.news.prevLabel}
              nextLabel={t.news.nextLabel}
            >
              <div className="news-carousel__track" ref={trackRef}>
                {items.map((item) => {
                  const text = localizedNews(item, lang);
                  return (
                    <article className="news-carousel__card" key={item.id}>
                      <Link to={`/berita/${item.slug}`} aria-label={text.title}>
                        <div className="news-carousel__media">
                          {item.thumbnail_url ? (
                            <img src={item.thumbnail_url} alt="" loading="lazy" />
                          ) : (
                            <FeaturedPlaceholder />
                          )}
                          <span className="news-carousel__category">
                            {(item.category && t.news.categoryNames[item.category]) ||
                              item.category ||
                              t.news.categoryFallback}
                          </span>
                          <div className="news-carousel__headline">
                            <h3>{text.title}</h3>
                          </div>
                        </div>
                        <div className="news-carousel__body">
                          {text.summary && <p>{text.summary}</p>}
                          <span className="news-carousel__meta">
                            <span>{formatDate(item.published_at, lang)}</span>
                            <span aria-hidden="true">•</span>
                            <span>{t.news.minRead(readingTime(text.content))}</span>
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
