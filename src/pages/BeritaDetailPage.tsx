import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "../components/Markdown";
import { fetchNewsBySlug, localizedNews } from "../lib/news";
import type { News } from "../lib/types";
import ArticleCta from "../components/ArticleCta";
import { formatDate } from "../utils/date";
import NotFoundPage from "./NotFoundPage";
import { usePageTitle } from "../hooks/usePageMeta";
import { useLanguage } from "../i18n/LanguageContext";

/** Halaman detail publik /berita/:slug — menampilkan isi lengkap satu berita. */
export default function BeritaDetailPage() {
  const { lang, t } = useLanguage();
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

  const text = news ? localizedNews(news, lang) : null;
  usePageTitle(text ? `${text.title} — Urushalal` : t.news.metaTitle);

  if (loading) {
    return (
      <section className="section">
        <div className="wrap">
          <p className="lead">{t.news.detail.loading}</p>
        </div>
      </section>
    );
  }

  if (!news || !text) return <NotFoundPage />;

  return (
    <article className="section">
      <div className="wrap article-wrap">
        <Link to="/berita" className="article-back">
          {t.news.detail.allNews}
        </Link>

        <header className="article-head">
          <span className="news-card__cat">
            {(news.category && t.news.categoryNames[news.category]) ||
              news.category ||
              t.news.categoryFallback}
          </span>
          <h1 className="h-display">{text.title}</h1>
          <time className="article-date">{formatDate(news.published_at, lang)}</time>
        </header>

        {news.thumbnail_url && (
          <img className="article-hero" src={news.thumbnail_url} alt={text.title} />
        )}

        <div className="prose">
          <Markdown>{text.content ?? ""}</Markdown>
        </div>

        <ArticleCta
          text={text.ctaText}
          buttonLabel={text.ctaButton}
          articleTitle={text.title}
        />
      </div>
    </article>
  );
}
