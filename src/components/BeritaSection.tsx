import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedNews } from "../lib/news";
import type { News } from "../lib/types";
import { formatDate } from "../utils/date";
import { useCarousel } from "../hooks/useCarousel";
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
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(
    ".news-carousel__card",
    items.length
  );

  useEffect(() => {
    let active = true;
    fetchPublishedNews({ limit: 8 }).then(({ items }) => {
      if (!active) return;
      setItems(items);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section" id="berita">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">Berita</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              Kabar & panduan terbaru seputar halal dan BPOM.
            </h2>
          </div>
          <Link to="/berita" className="section__link">
            Semua berita
          </Link>
        </div>

        {loading ? (
          <p className="lead">Memuat berita…</p>
        ) : items.length === 0 ? (
          <p className="lead">
            Belum ada berita terbaru. Silakan cek kembali nanti, atau{" "}
            <Link to="/berita" style={{ textDecoration: "underline" }}>
              lihat semua berita
            </Link>
            .
          </p>
        ) : (
          <div className="news-carousel">
            <Carousel
              progress={progress}
              ratio={ratio}
              onPrev={() => slide(-1)}
              onNext={() => slide(1)}
              prevLabel="Berita sebelumnya"
              nextLabel="Berita berikutnya"
            >
              <div className="news-carousel__track" ref={trackRef}>
                {items.map((item) => (
                  <article className="news-carousel__card" key={item.id}>
                    <Link to={`/berita/${item.slug}`} aria-label={item.title}>
                      <div className="news-carousel__media">
                        {item.thumbnail_url ? (
                          <img src={item.thumbnail_url} alt="" loading="lazy" />
                        ) : (
                          <FeaturedPlaceholder />
                        )}
                        <span className="news-carousel__category">
                          {item.category ?? "Berita"}
                        </span>
                        <div className="news-carousel__headline">
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                      <div className="news-carousel__body">
                        {item.summary && <p>{item.summary}</p>}
                        <span className="news-carousel__meta">
                          <span>{formatDate(item.published_at)}</span>
                          <span aria-hidden="true">•</span>
                          <span>{readingTime(item.content)} menit baca</span>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
