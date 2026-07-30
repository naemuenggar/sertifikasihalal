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
import { services } from "../data/services";

/** Ikon + deskripsi satu-baris tiap layanan (judul & slug tetap dari data/services). */
const layananMeta: Record<string, { icon: LucideIcon; tagline: string }> = {
  "sertifikasi-halal-reguler": {
    icon: ShieldCheck,
    tagline: "Sertifikasi halal penuh di Indonesia — SIHALAL, audit LPH, hingga sertifikat BPJPH.",
  },
  "registrasi-sertifikat-halal-luar-negeri": {
    icon: Globe,
    tagline: "Daftarkan sertifikat halal luar negeri (MRA) agar diakui di Indonesia, lebih cepat.",
  },
  "registrasi-makanan-minuman-bpom": {
    icon: UtensilsCrossed,
    tagline: "Izin edar BPOM untuk pangan olahan & minuman kemasan (MD/ML) hingga siap dijual.",
  },
  "registrasi-kosmetik-bpom": {
    icon: Sparkles,
    tagline: "Notifikasi kosmetik (NA) untuk skincare, makeup, hingga parfum sesuai standar BPOM.",
  },
  "registrasi-suplemen-kesehatan-bpom": {
    icon: Pill,
    tagline: "Izin edar suplemen — vitamin, mineral, herbal — sesuai ketentuan keamanan BPOM.",
  },
};

const layananItems = services.map((s) => ({
  slug: s.slug,
  name: s.name,
  icon: layananMeta[s.slug]?.icon ?? ShieldCheck,
  tagline: layananMeta[s.slug]?.tagline ?? s.shortDesc,
}));

const linksBefore = [
  { to: "/", label: "Beranda" },
  { to: "/tentang-kami", label: "Tentang Kami" },
];
const linksAfter = [
  { to: "/#alur", label: "Alur" },
  { to: "/berita", label: "Berita" },
];

export default function Header() {
  const [open, setOpen] = useState(false); // menu hamburger
  const [dropOpen, setDropOpen] = useState(false); // dropdown Layanan (desktop)
  const [mobLayananOpen, setMobLayananOpen] = useState(false); // accordion Layanan (mobile)
  const dropRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  // Dropdown desktop: tutup saat klik di luar atau tekan Escape.
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
        <Link to="/" className="brand" onClick={close} aria-label="Urushalal beranda">
          <LogoMark className="brand__mark" />
          Urushalal
        </Link>

        {/* ---------- Navigasi desktop ---------- */}
        <nav className="nav" aria-label="Utama">
          {linksBefore.map((n) => (
            <Link key={n.to} to={n.to} onClick={close}>
              {n.label}
            </Link>
          ))}

          {/* "Layanan" bukan link, melainkan pemicu dropdown pemilih layanan. */}
          <div className="nav-layanan" ref={dropRef}>
            <button
              type="button"
              className="nav-layanan__btn"
              aria-expanded={dropOpen}
              aria-haspopup="true"
              onClick={() => setDropOpen((v) => !v)}
            >
              Layanan
              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`nav-layanan__chev${dropOpen ? " is-open" : ""}`}
              />
            </button>

            {dropOpen && (
              <div className="nav-dropdown" role="menu" aria-label="Pilih layanan">
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
            )}
          </div>

          {linksAfter.map((n) => (
            <Link key={n.to} to={n.to} onClick={close}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <WaLink className="btn btn--solid" onClick={close}>
            Konsultasi gratis
          </WaLink>
          <button
            className="menu-btn"
            aria-label={open ? "Tutup menu" : "Buka menu"}
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
          <nav className="mobile-nav" aria-label="Mobile">
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
                Layanan
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
              Konsultasi gratis
            </WaLink>
          </div>
        </div>
      </div>
    </header>
  );
}
