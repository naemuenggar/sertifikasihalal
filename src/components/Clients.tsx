import type { KeyboardEvent } from "react";
import Carousel from "./Carousel";
import { useCarousel } from "../hooks/useCarousel";
import { useLanguage } from "../i18n/LanguageContext";
import clientData from "../data/data-klien.json";

type Client = (typeof clientData.clients)[number];

function initials(name: string) {
  const prefixes = new Set(["PT", "CV", "UD", "PD", "TB", "PO", "PT.", "CV.", "UD.", "PD.", "TB.", "PO."]);
  const words = name.replace(/\([^)]*\)/g, "").split(/\s+/).filter(Boolean);
  const coreWords = words.filter((word) => !prefixes.has(word.toUpperCase()));
  const source = coreWords.length > 0 ? coreWords : words;
  const acronym = source[0]?.length > 2 ? source[0].slice(0, 3) : source.slice(0, 2).map((word) => word[0]).join("");
  return acronym.toUpperCase();
}

function ClientCard({ client }: { client: Client }) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";
  const country = isEn ? client.countryEn : client.country;
  const description = isEn ? client.descriptionEn : client.description;
  const layanan = isEn ? client.layananRuangHalalEn : client.layananRuangHalal;

  return (
    <article className="client-card clients-carousel__card">
      <div className="client-card__logo">
        {client.logo ? (
          <img src={`/logo-klien/${client.logo}`} alt={client.name} loading="lazy" />
        ) : (
          <span aria-hidden="true">{initials(client.name)}</span>
        )}
      </div>
      <div className="client-card__country" role="img" aria-label={t.clients.origin(country)}>
        <img
          src={`https://flagcdn.com/w80/${client.flagCode.toLowerCase()}.png`}
          alt={t.clients.flagAlt(country)}
          width="48"
          height="32"
          loading="lazy"
        />
      </div>
      <h3>{client.name}</h3>
      <p>{description}</p>
      <span className="client-card__service">{layanan}</span>
    </article>
  );
}

export default function Clients() {
  const { t } = useLanguage();
  const { trackRef, slide, progress, ratio } = useCarousel<HTMLDivElement>(".clients-carousel__card");
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      slide(event.key === "ArrowLeft" ? -1 : 1);
    }
  };

  return (
    <section className="section clients-section" id="klien" data-service="neutral">
      <div className="wrap">
        <div className="section__head">
          <div className="section__title">
            <span className="eyebrow">{t.clients.eyebrow}</span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>{t.clients.title}</h2>
          </div>
          <p className="lead">{t.clients.lead}</p>
        </div>
        <div className="clients-carousel-shell">
          <Carousel progress={progress} ratio={ratio} onPrev={() => slide(-1)} onNext={() => slide(1)} prevLabel={t.clients.prevLabel} nextLabel={t.clients.nextLabel}>
            <div className="clients-carousel" ref={trackRef} tabIndex={0} onKeyDown={handleKeyDown} aria-label={t.clients.listLabel}>
              {clientData.clients.map((client) => <ClientCard client={client} key={client.id} />)}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
