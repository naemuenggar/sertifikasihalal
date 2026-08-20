import { useLanguage } from "../i18n/LanguageContext";

/** Toggle pill "ID | EN" di header. Selalu terlihat di semua ukuran layar,
 *  jadi tidak perlu duplikat di dalam hamburger menu. */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label={t.header.aria.language}>
      <button
        type="button"
        data-active={lang === "id"}
        aria-pressed={lang === "id"}
        onClick={() => setLang("id")}
      >
        ID
      </button>
      <button
        type="button"
        data-active={lang === "en"}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
