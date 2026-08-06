import { Link, useParams } from "react-router-dom";
import { getService, services, bpomServiceSlugs } from "../data/services";
import PageHero from "../components/PageHero";
import WaLink from "../components/WaLink";
import NotFoundPage from "./NotFoundPage";
import { usePageTitle } from "../hooks/usePageMeta";

/** Halaman detail /layanan/:slug — artikel singkat satu layanan. */
export default function LayananDetailPage() {
  const { slug } = useParams();
  const service = getService(slug);
  usePageTitle(service ? `${service.name} — Urushalal` : "Tidak ditemukan — Urushalal");

  if (!service) return <NotFoundPage />;

  const others = services.filter((s) => s.slug !== service.slug);
  const serviceType = bpomServiceSlugs.includes(service.slug) ? "bpom" : "halal";

  return (
    <>
      <PageHero eyebrow="Layanan" title={service.name} />

      <section className="section" style={{ paddingTop: 0 }} data-service={serviceType}>
        <div className="wrap">
          <div className="detail-layout">
            <article className="prose detail-article">
              <p>{service.article}</p>
            </article>

            <aside className="detail-side">
              <div className="detail-cta">
                <h3>Tertarik dengan layanan ini?</h3>
                <p>Konsultasikan kebutuhan produk Anda — gratis, tanpa kewajiban.</p>
                <WaLink className="btn btn--solid">Konsultasi gratis</WaLink>
                <Link to="/" className="btn btn--ghost">
                  Kembali ke beranda
                </Link>
              </div>

              <div className="detail-others">
                <h4>Layanan lainnya</h4>
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
