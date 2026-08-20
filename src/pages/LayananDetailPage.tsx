import { Link, useParams } from "react-router-dom";
import { getService, getServices, bpomServiceSlugs } from "../data/services";
import PageHero from "../components/PageHero";
import WaLink from "../components/WaLink";
import NotFoundPage from "./NotFoundPage";
import { usePageTitle } from "../hooks/usePageMeta";
import { useLanguage } from "../i18n/LanguageContext";

/** Halaman detail /layanan/:slug — artikel singkat satu layanan. */
export default function LayananDetailPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const service = getService(slug, t.services.items);
  usePageTitle(service ? `${service.name} — Urushalal` : t.services.metaNotFound);

  if (!service) return <NotFoundPage />;

  const others = getServices(t.services.items).filter((s) => s.slug !== service.slug);
  const serviceType = (bpomServiceSlugs as readonly string[]).includes(service.slug) ? "bpom" : "halal";

  return (
    <>
      <PageHero eyebrow={t.services.detail.eyebrow} title={service.name} />

      <section className="section" style={{ paddingTop: 0 }} data-service={serviceType}>
        <div className="wrap">
          <div className="detail-layout">
            <article className="prose detail-article">
              <p>{service.article}</p>
            </article>

            <aside className="detail-side">
              <div className="detail-cta">
                <h3>{t.services.detail.ctaTitle}</h3>
                <p>{t.services.detail.ctaText}</p>
                <WaLink className="btn btn--solid">{t.common.freeConsult}</WaLink>
                <Link to="/" className="btn btn--ghost">
                  {t.common.backHome}
                </Link>
              </div>

              <div className="detail-others">
                <h4>{t.services.detail.others}</h4>
                <ul>
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/layanan/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
