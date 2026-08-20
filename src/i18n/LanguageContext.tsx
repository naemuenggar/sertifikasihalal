import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { id, type Translations } from "./id";
import { en } from "./en";

export type Lang = "id" | "en";

/** Kunci localStorage untuk mengingat pilihan bahasa pengunjung. */
const STORAGE_KEY = "urushalal-lang";

const translations: Record<Lang, Translations> = { id, en };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Objek terjemahan bahasa aktif — diakses langsung, mis. t.header.nav.home. */
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Default "id" (Bahasa Indonesia); pakai simpanan user kalau ada. */
function getInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en") return saved;
  } catch {
    /* localStorage tidak tersedia (mis. mode privat) — pakai default. */
  }
  return "id";
}

/** Sinkronkan <html lang> + meta SEO global (description, Open Graph, Twitter)
 *  dengan bahasa aktif, supaya versi EN punya meta tersendiri. */
function syncDocumentMeta(lang: Lang, t: Translations) {
  document.documentElement.lang = lang;
  const setMeta = (attr: "name" | "property", key: string, content: string) => {
    document
      .querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      ?.setAttribute("content", content);
  };
  setMeta("name", "description", t.meta.description);
  setMeta("property", "og:title", t.meta.ogTitle);
  setMeta("property", "og:description", t.meta.ogDescription);
  setMeta("property", "og:locale", t.meta.ogLocale);
  setMeta("name", "twitter:title", t.meta.ogTitle);
  setMeta("name", "twitter:description", t.meta.ogDescription);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const t = translations[lang];

  useEffect(() => {
    syncDocumentMeta(lang, t);
  }, [lang, t]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Gagal menyimpan bukan alasan menggagalkan ganti bahasa. */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus dipakai di dalam LanguageProvider");
  return ctx;
}
