import { Link } from "react-router-dom";
import { LogoMark } from "./icons";
import WaLink from "./WaLink";
import { WA_DISPLAY, WA_LINK } from "../utils/contact";
import { getServices, bpomServiceSlugs } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const halalServices = getServices(t.services.items).filter(
    (s) => !(bpomServiceSlugs as readonly string[]).includes(s.slug),
  );

  return (
    <>
      <section className="cta-band" id="kontak" data-service="neutral">
        <div className="wrap cta-band__inner">
          <h2>
            {t.footer.ctaTitle} <em>{t.footer.ctaTitleAccent}</em>
          </h2>
          <WaLink className="btn btn--solid">{t.footer.ctaButton}</WaLink>
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
              <p className="foot-tag">{t.footer.tagline}</p>
            </div>

            <div>
              <h4>{t.footer.servicesTitle}</h4>
              <ul>
                {halalServices.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/layanan/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
              <div className="foot-sub">
                <span className="foot-sub__label">{t.footer.bpomLabel}</span>
                <ul>
                  {bpomServiceSlugs.map((slug) => (
                    <li key={slug}>
                      <Link to={`/layanan/${slug}`}>{t.footer.bpomShort[slug]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4>{t.footer.companyTitle}</h4>
              <ul>
                <li><Link to="/tentang-kami">{t.footer.companyLinks.about}</Link></li>
                <li><Link to="/#alur">{t.footer.companyLinks.flow}</Link></li>
                <li><Link to="/berita">{t.footer.companyLinks.news}</Link></li>
                <li><Link to="/#faq">{t.footer.companyLinks.faq}</Link></li>
              </ul>
            </div>

            <div>
              <h4>{t.footer.contactTitle}</h4>
              <ul>
                <li><a href="mailto:halo@urushalal.id">halo@urushalal.id</a></li>
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    {WA_DISPLAY}
                  </a>
                </li>
                <li>{t.footer.city}</li>
                <li>{t.footer.hours}</li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{t.footer.copyright}</span>
            <span>
              <a href="/kebijakan-privasi">{t.footer.privacy}</a> · <a href="/syarat-layanan">{t.footer.terms}</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
