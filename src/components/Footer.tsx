import { LogoMark } from "./icons";
import ScrollLink from "./ScrollLink";
import { WA_DISPLAY, WA_LINK } from "../utils/contact";

export default function Footer() {
  return (
    <>
      <section className="cta-band" id="kontak">
        <div className="wrap cta-band__inner">
          <h2>
            Saatnya produk Anda <em>resmi halal.</em>
          </h2>
          <ScrollLink to="kontak" className="btn btn--solid">
            Mulai konsultasi gratis
          </ScrollLink>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <LogoMark className="brand__mark" />
                Urushalal
              </div>
              <p className="foot-tag">
                Pendamping sertifikasi halal untuk usaha Indonesia. Terdaftar
                dan terhubung dengan LPH resmi.
              </p>
            </div>
            <div>
              <h4>Layanan</h4>
              <ul>
                <li><ScrollLink to="layanan">Konsultasi gratis</ScrollLink></li>
                <li><ScrollLink to="layanan">Dokumen</ScrollLink></li>
                <li><ScrollLink to="layanan">Audit</ScrollLink></li>
                <li><ScrollLink to="layanan">Renewal</ScrollLink></li>
              </ul>
            </div>
            <div>
              <h4>Perusahaan</h4>
              <ul>
                <li><ScrollLink to="proses">Proses</ScrollLink></li>
                <li><ScrollLink to="paket">Paket</ScrollLink></li>
                <li><ScrollLink to="artikel">Artikel</ScrollLink></li>
                <li><ScrollLink to="faq">FAQ</ScrollLink></li>
              </ul>
            </div>
            <div>
              <h4>Kontak</h4>
              <ul>
                <li><ScrollLink to="kontak">halo@urushalal.id</ScrollLink></li>
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
            <span>Kebijakan privasi · Syarat layanan</span>
          </div>
        </div>
      </footer>
    </>
  );
}
