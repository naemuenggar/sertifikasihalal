import { useState } from "react";
import { Plus } from "lucide-react";
import Markdown from "./Markdown";
import ScrollLink from "./ScrollLink";
import { useLanguage } from "../i18n/LanguageContext";

type FaqCategory = "halal" | "bpom";

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  const [category, setCategory] = useState<FaqCategory>("halal");
  const activeFaqs = category === "halal" ? t.faq.halalItems : t.faq.bpomItems;

  const selectCategory = (nextCategory: FaqCategory) => {
    setCategory(nextCategory);
    setOpen(0);
  };

  return (
    <section className="section" id="faq" data-service="neutral">
      <div className="wrap">
        <div className="faq">
          <div className="faq__intro">
            <span className="eyebrow" style={{ display: "inline-flex" }}>
              {t.faq.eyebrow}
            </span>
            <h2 className="h-section" style={{ marginTop: "0.7rem" }}>
              {t.faq.title}
            </h2>
            <p className="lead">{t.faq.lead}</p>
            <ScrollLink to="kontak" className="btn btn--ghost" style={{ marginTop: "1.5rem" }}>
              {t.faq.ask}
            </ScrollLink>
          </div>

          <div className="faq__content">
            <div className="faq__tabs" role="tablist" aria-label={t.faq.tablistLabel}>
              <button
                type="button"
                className="faq__tab"
                role="tab"
                data-category="halal"
                aria-selected={category === "halal"}
                onClick={() => selectCategory("halal")}
              >
                {t.faq.tabs.halal}
              </button>
              <button
                type="button"
                className="faq__tab"
                role="tab"
                data-category="bpom"
                aria-selected={category === "bpom"}
                onClick={() => selectCategory("bpom")}
              >
                {t.faq.tabs.bpom}
              </button>
            </div>

            <div className="faq__list">
              {activeFaqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div className="faq-item" key={f.q} data-open={isOpen}>
                    <button
                      className="faq-item__q"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="faq-item__icon-wrap" aria-hidden="true">
                        <Plus className="faq-item__icon" size={18} strokeWidth={2} />
                      </span>
                    </button>
                    <div className="faq-item__a">
                      <div className="prose prose--inline">
                        <Markdown>{f.a}</Markdown>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
