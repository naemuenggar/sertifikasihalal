import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { fetchPublishedNews, localizedNews } from "../lib/news";
import type { News } from "../lib/types";
import { formatDate } from "../utils/date";
import { usePageTitle } from "../hooks/usePageMeta";
import { useLanguage } from "../i18n/LanguageContext";

const PAGE_SIZE = 9;

/** Halaman /berita — daftar berita published, terbaru dulu, dengan pagination. */
export default function BeritaPage() {
  const { lang, t } = useLanguage();
  usePageTitle(t.news.metaTitle);

  const [params, setParams] = useSearchParams();
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);

  const [items, setItems] = useState<News[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPublishedNews({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }).then(
      ({ items, count }) => {
        if (!active) return;
        setItems(items);
        setTotal(count);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const setPage = (p: number) => {
    setParams(p <= 1 ? {} : { page: String(p) });
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <PageHero
        eyebrow={t.news.page.eyebrow}
        title={
          <>
            {t.news.page.titleHead} <em>{t.news.page.titleAccent}</em>
          </>
        }
        lead={t.news.page.lead}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {loading ? (
            <p className="lead">{t.news.page.loading}</p>
          ) : items.length === 0 ? (
            <p className="lead">{t.news.page.empty}</p>
          ) : (
            <>
              <div className="news-grid">
                {items.map((n) => {
                  const text = localizedNews(n, lang);
                  return (
                    <Link key={n.id} to={`/berita/${n.slug}`} className="news-card">
                      <div className="news-card__media">
                        {n.thumbnail_url ? (
                          <img src={n.thumbnail_url} alt={text.title} loading="lazy" />
                        ) : (
                          <span className="news-card__ph" aria-hidden="true" />
                        )}
                      </div>
                      <div className="news-card__body">
                        <div className="news-card__meta">
                          <span className="news-card__cat">
                            {(n.category && t.news.categoryNames[n.category]) ||
                              n.category ||
                              t.news.categoryFallback}
                          </span>
                          <span className="news-card__date">{formatDate(n.published_at, lang)}</span>
                        </div>
                        <h3>{text.title}</h3>
                        {text.summary && <p>{text.summary}</p>}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label={t.news.page.paginationLabel}>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                  >
                    {t.news.page.prev}
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      type="button"
                      key={p}
                      className={`pagination__num${p === page ? " is-active" : ""}`}
                      onClick={() => setPage(p)}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    {t.news.page.next}
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
