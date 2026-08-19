import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchNewsBySlug } from "../lib/news";
import type { News } from "../lib/types";
import WaLink from "../components/WaLink";
import { formatDate } from "../utils/date";
import NotFoundPage from "./NotFoundPage";
import { usePageTitle } from "../hooks/usePageMeta";

/** Halaman detail publik /berita/:slug — menampilkan isi lengkap satu berita. */
export default function BeritaDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchNewsBySlug(slug).then((n) => {
      if (!active) return;
      setNews(n);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  usePageTitle(news ? `${news.title} — Urushalal` : "Berita — Urushalal");

  if (loading) {
    return (
      <section className="section">
        <div className="wrap">
          <p className="lead">Memuat berita…</p>
        </div>
      </section>
    );
  }

  if (!news) return <NotFoundPage />;

  return (
    <article className="section">
      <div className="wrap article-wrap">
        <Link to="/berita" className="article-back">
          ← Semua berita
        </Link>

        <header className="article-head">
          <span className="news-card__cat">{news.category ?? "Berita"}</span>
          <h1 className="h-display">{news.title}</h1>
          <time className="article-date">{formatDate(news.published_at)}</time>
        </header>

        {news.thumbnail_url && (
          <img className="article-hero" src={news.thumbnail_url} alt={news.title} />
        )}

        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{news.content ?? ""}</ReactMarkdown>
        </div>

        {news.cta_text && (
          <div className="article-cta">
            <WaLink
              className="btn btn--solid"
              message={`Halo, saya membaca artikel "${news.title}" dan ingin konsultasi.`}
            >
              {news.cta_text}
            </WaLink>
          </div>
        )}
      </div>
    </article>
  );
}
