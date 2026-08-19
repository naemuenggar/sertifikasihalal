import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import { fetchNewsBySlug } from "../lib/news";
import type { News } from "../lib/types";
import ArticleCta from "../components/ArticleCta";
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
          <Markdown>{news.content ?? ""}</Markdown>
        </div>

        <ArticleCta
          text={news.cta_text}
          buttonLabel={news.cta_button}
          articleTitle={news.title}
        />
      </div>
    </article>
  );
}
