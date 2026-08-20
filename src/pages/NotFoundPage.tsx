import { Link } from "react-router-dom";
import { LogoMark } from "../components/icons";
import { usePageTitle, useNoIndex } from "../hooks/usePageMeta";
import { useLanguage } from "../i18n/LanguageContext";

/** Halaman 404. Juga dipakai oleh guard admin: route /admin/* yang diakses
 *  tanpa login menampilkan ini, supaya orang luar tidak tahu route admin ada. */
export default function NotFoundPage() {
  const { t } = useLanguage();
  usePageTitle(t.notFound.metaTitle);
  useNoIndex();

  return (
    <section className="notfound">
      <div className="wrap notfound__inner">
        <LogoMark className="notfound__mark" size={44} />
        <span className="notfound__code">404</span>
        <h1 className="h-display">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.text}</p>
        <Link to="/" className="btn btn--solid">
          {t.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
