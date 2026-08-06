import { Link } from "react-router-dom";
import { LogoMark } from "./icons";
import WaLink from "./WaLink";
import { WA_DISPLAY, WA_LINK } from "../utils/contact";
import { services, bpomServiceSlugs } from "../data/services";

/** Tiga layanan BPOM diberi label pendek di footer. */
const bpomShortLabel: Record<string, string> = {
  "registrasi-makanan-minuman-bpom": "Pangan",
  "registrasi-kosmetik-bpom": "Kosmetik",
  "registrasi-suplemen-kesehatan-bpom": "Suplemen",
};

const halalServices = services.filter((s) => !bpomServiceSlugs.includes(s.slug));

export default function Footer() {
  return (
    <>
      <section className="cta-band" id="kontak" data-service="neutral">
        <div className="wrap cta-band__inner">
          <h2>
            Saatnya produk Anda <em>resmi halal.</em>
          </h2>
          <WaLink className="btn btn--solid">Mulai konsultasi gratis</WaLink>
        </div>
      </section>

      <footer className="site-footer" data-service="neutral">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <LogoMark className="brand__mark" />
                Urushalal
              </div>
              <p className="foot-tag">
                Pendamping sertifikasi halal & izin edar BPOM untuk usaha
                Indonesia. Terdaftar dan terhubung dengan LPH resmi.
              </p>
            </div>

            <div>
              <h4>Layanan</h4>
              <ul>
                {halalServices.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/layanan/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
              <div className="foot-sub">
                <span className="foot-sub__label">Izin Edar BPOM</span>
                <ul>
                  {bpomServiceSlugs.map((slug) => (
                    <li key={slug}>
                      <Link to={`/layanan/${slug}`}>{bpomShortLabel[slug] ?? slug}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4>Perusahaan</h4>
              <ul>
                <li><Link to="/tentang-kami">Tentang Kami</Link></li>
                <li><Link to="/#alur">Alur</Link></li>
                <li><Link to="/berita">Berita</Link></li>
                <li><Link to="/#faq">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4>Kontak</h4>
              <ul>
                <li><a href="mailto:halo@urushalal.id">halo@urushalal.id</a></li>
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    {WA_DISPLAY}
                  </a>
                </li>
                <li>Jakarta Selatan</li>
                <li>Senin–Jumat, 09–17 WIB</li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Urushalal. Bekerja sesuai regulasi BPJPH & MUI.</span>
            <span>
              <a href="/kebijakan-privasi">Kebijakan privasi</a> · <a href="/syarat-layanan">Syarat layanan</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
