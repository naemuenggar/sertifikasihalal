import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Globe,
  Pill,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./icons";
import WaLink from "./WaLink";
import LanguageSwitcher from "./LanguageSwitcher";
import { getServices, type ServiceSlug } from "../data/services";
import { useLanguage } from "../i18n/LanguageContext";

/** Ikon tiap layanan (bahasa-netral). Judul & tagline datang dari i18n. */
const layananIcons: Record<ServiceSlug, LucideIcon> = {
  "sertifikasi-halal-reguler": ShieldCheck,
  "registrasi-sertifikat-halal-luar-negeri": Globe,
  "registrasi-makanan-minuman-bpom": UtensilsCrossed,
  "registrasi-kosmetik-bpom": Sparkles,
  "registrasi-suplemen-kesehatan-bpom": Pill,
};

/** Delay sebelum dropdown menutup saat mouse leave, supaya tidak langsung
 *  hilang kalau kursor sekilas keluar area saat pindah ke submenu. */
const DROP_CLOSE_DELAY_MS = 150;

export default function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false); // menu hamburger
  const [dropOpen, setDropOpen] = useState(false); // dropdown Layanan (desktop)
  const [mobLayananOpen, setMobLayananOpen] = useState(false); // accordion Layanan (mobile)
  const dropRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const layananItems = getServices(t.services.items).map((s) => ({
    slug: s.slug,
    name: s.name,
    icon: layananIcons[s.slug],
    tagline: t.header.serviceTaglines[s.slug],
  }));

  const linksBefore = [
    { to: "/", label: t.header.nav.home },
    { to: "/tentang-kami", label: t.header.nav.about },
  ];
  const linksAfter = [
    { to: "/#alur", label: t.header.nav.flow },
    { to: "/berita", label: t.header.nav.news },
  ];

  const close = () => setOpen(false);

  /** Buka dropdown segera dan batalkan timer tutup yang sedang jalan. */
  const openDrop = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDropOpen(true);
  };

  /** Tutup dropdown setelah delay — kalau mouse masuk lagi sebelum
   *  timer habis, timer dibatalkan oleh openDrop(). */
  const closeDrop = () => {
    closeTimer.current = window.setTimeout(() => {
      setDropOpen(false);
      closeTimer.current = null;
    }, DROP_CLOSE_DELAY_MS);
  };

  // Bersihkan timer saat unmount.
  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  // Tutup dropdown saat klik di luar atau tekan Escape.
  useEffect(() => {
    if (!dropOpen) return;
    const onDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropOpen]);

  return (
    <header className="site-header" data-open={open}>
      <div className="wrap site-header__inner">
        <Link to="/" className="brand" onClick={close} aria-label={t.header.aria.brandHome}>
          <LogoMark className="brand__mark" />
          Urushalal
        </Link>

        {/* ---------- Navigasi desktop ---------- */}
        <nav className="nav" aria-label={t.header.aria.mainNav}>
          {linksBefore.map((n) => (
            <Link key={n.to} to={n.to} onClick={close}>
              {n.label}
            </Link>
          ))}

          {/* "Layanan" — hover buka dropdown (desktop), klik sebagai fallback (touch).
              onFocus/onBlur agar keyboard Tab juga bisa membuka. */}
          <div
            className="nav-layanan"
            ref={dropRef}
            onMouseEnter={openDrop}
            onMouseLeave={closeDrop}
            onFocus={openDrop}
            onBlur={(e) => {
              // Tutup hanya kalau fokus pindah ke luar wrapper.
              if (!dropRef.current?.contains(e.relatedTarget as Node)) closeDrop();
            }}
          >
            <button
              type="button"
              className="nav-layanan__btn"
              aria-expanded={dropOpen}
              aria-haspopup="true"
              onClick={() => setDropOpen((v) => !v)}
            >
              {t.header.nav.services}
              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`nav-layanan__chev${dropOpen ? " is-open" : ""}`}
              />
            </button>

            <div
              className="nav-dropdown"
              role="menu"
              aria-label={t.header.aria.chooseService}
              data-open={dropOpen}
            >
              {layananItems.map(({ slug, name, icon: Icon, tagline }) => (
                <Link
                  key={slug}
                  to={`/layanan/${slug}`}
                  className="nav-dropdown__item"
                  role="menuitem"
                  onClick={() => setDropOpen(false)}
                >
                  <span className="nav-dropdown__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="nav-dropdown__text">
                    <span className="nav-dropdown__title">{name}</span>
                    <span className="nav-dropdown__desc">{tagline}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {linksAfter.map((n) => (
            <Link key={n.to} to={n.to} onClick={close}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <LanguageSwitcher />
          <WaLink className="btn btn--solid" onClick={close}>
            {t.common.freeConsult}
          </WaLink>
          <button
            className="menu-btn"
            aria-label={open ? t.header.aria.closeMenu : t.header.aria.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ---------- Menu mobile (hamburger) ---------- */}
      <div className="mobile-menu" data-open={open}>
        <div className="wrap mobile-menu__inner">
          <nav className="mobile-nav" aria-label={t.header.aria.mobileNav}>
            {linksBefore.map((n) => (
              <Link key={n.to} to={n.to} className="mobile-nav__item" onClick={close}>
                {n.label}
              </Link>
            ))}

            {/* Di mobile, "Layanan" jadi accordion — bukan popup mengambang. */}
            <div className="mobile-accordion">
              <button
                type="button"
                className="mobile-nav__item mobile-accordion__btn"
                aria-expanded={mobLayananOpen}
                onClick={() => setMobLayananOpen((v) => !v)}
              >
                {t.header.nav.services}
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`nav-layanan__chev${mobLayananOpen ? " is-open" : ""}`}
                />
              </button>
              {mobLayananOpen && (
                <div className="mobile-accordion__panel">
                  {layananItems.map(({ slug, name, icon: Icon, tagline }) => (
                    <Link
                      key={slug}
                      to={`/layanan/${slug}`}
                      className="mobile-accordion__item"
                      onClick={close}
                    >
                      <span className="mobile-accordion__icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="mobile-accordion__title">{name}</span>
                        <span className="mobile-accordion__desc">{tagline}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {linksAfter.map((n) => (
              <Link key={n.to} to={n.to} className="mobile-nav__item" onClick={close}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__cta">
            <WaLink className="btn btn--solid" onClick={close}>
              {t.common.freeConsult}
            </WaLink>
          </div>
        </div>
      </div>
    </header>
  );
}
