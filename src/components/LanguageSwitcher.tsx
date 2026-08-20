import { useLanguage } from "../i18n/LanguageContext";
import { FlagGb, FlagId } from "./icons";

/** Toggle bendera di header. Selalu terlihat di semua ukuran layar,
 *  jadi tidak perlu duplikat di dalam hamburger menu.
 *  Label bendera sengaja ditulis dalam bahasanya masing-masing (bukan ikut
 *  bahasa aktif) supaya selalu bisa dikenali penutur aslinya. */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label={t.header.aria.language}>
      <button
        type="button"
        data-active={lang === "id"}
        aria-pressed={lang === "id"}
        aria-label="Bahasa Indonesia"
        title="Bahasa Indonesia"
        onClick={() => setLang("id")}
      >
        <FlagId />
      </button>
      <button
        type="button"
        data-active={lang === "en"}
        aria-pressed={lang === "en"}
        aria-label="English"
        title="English"
        onClick={() => setLang("en")}
      >
        <FlagGb />
      </button>
    </div>
  );
}
