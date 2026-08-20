import PageHero from "../components/PageHero";
import { usePageTitle } from "../hooks/usePageMeta";
import { useLanguage } from "../i18n/LanguageContext";

export default function TentangKamiPage() {
  const { t } = useLanguage();
  usePageTitle(t.about.metaTitle);

  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={
          <>
            {t.about.titleHead} <em>{t.about.titleAccent}</em>
          </>
        }
      />

      <section className="section" data-service="neutral">
        <div className="wrap about-stack">

          {/* Card 1 — Profil Singkat */}
          <div className="about-card prose">
            <h2>{t.about.profileTitle}</h2>
            <p>{t.about.profileText}</p>
          </div>

          {/* Card 2 — Visi & Misi */}
          <div className="about-card about-card--vm">
            <div className="about-vm-inner">
              <div>
                <h3 className="about-card-heading">{t.about.visionTitle}</h3>
                <p className="about-card-text">{t.about.visionText}</p>
              </div>
              <div>
                <h3 className="about-card-heading">{t.about.missionTitle}</h3>
                <ul className="about-card-list">
                  {t.about.mission.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 — Kenapa Memilih Kami */}
          <div className="about-card">
            <h2>{t.about.whyTitle}</h2>
            <ul className="about-list-grid">
              {t.about.why.map((k) => (
                <li key={k}>
                  <span className="about-list-check">✓</span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}
