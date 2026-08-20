import WaLink from "./WaLink";
import { useLanguage } from "../i18n/LanguageContext";

export default function Packages() {
  const { t } = useLanguage();

  return (
    <section className="section" id="paket" data-service="neutral">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">{t.packages.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              {t.packages.title}
            </h2>
          </div>
        </div>

        {t.packages.categories.map((category) => (
          <div className="pkg-category" key={category.key}>
            <div className="pkg-category__head">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="pkg-grid">
              {category.packages.map((p) => (
                <article className={`pkg${p.feat ? " pkg--feat" : ""}`} key={`${category.key}-${p.name}`}>
                  <span className="pkg__lbl">{p.lbl}</span>
                  <h3>{p.name}</h3>
                  <div className="pkg__price">
                    {p.price}
                    <br />
                    <small>{p.unit}</small>
                  </div>
                  <ul>
                    {t.packages.features[p.tier].map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <WaLink
                    className={`btn ${p.feat ? "btn--solid" : "btn--ghost"}`}
                    message={t.packages.waMessage(category.name, p.name)}
                  >
                    {t.packages.choose(p.name)}
                  </WaLink>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
